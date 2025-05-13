import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import { getUserData, updateUserData, createUserProfile } from '../supabase/database';
import { debugLog } from '../utils/debug';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);
  const [incompleteRegistration, setIncompleteRegistration] = useState(null);
  const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0);

  // Initialize auth state listener
  useEffect(() => {
    // Check for user in localStorage first for faster loading
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Check for pending verification
    const pendingVerification = localStorage.getItem('pendingVerification');
    if (pendingVerification) {
      try {
        const verificationData = JSON.parse(pendingVerification);
        // Only set if it's recent (within the last 24 hours)
        const timestamp = new Date(verificationData.timestamp);
        const now = new Date();
        const hoursDiff = (now - timestamp) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          setUser({
            ...verificationData,
            isUnverified: true,
            needsEmailVerification: true
          });
        } else {
          // Expired verification status
          localStorage.removeItem('pendingVerification');
        }
      } catch (error) {
        console.error('Failed to parse pending verification data:', error);
        localStorage.removeItem('pendingVerification');
      }
    }

    // Set up Supabase auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);

        console.log('Auth state change event:', event, session?.user?.id || 'No user');

        try {
          if (session) {
            // User is signed in
            const { user: authUser } = session;

            // Clear any pending verification when we have a valid session
            localStorage.removeItem('pendingVerification');

            // Get full user profile from database
            try {
              const userData = await getUserData(authUser.id);

              if (userData) {
                // Check if profile is complete
                const needsSetup = !userData.registration_complete;
                setNeedsProfileCompletion(needsSetup);

                // Set user data in state
                setUser({
                  id: authUser.id,
                  email: authUser.email,
                  ...userData
                });

                // Save to localStorage for persistence
                localStorage.setItem('user', JSON.stringify({
                  id: authUser.id,
                  email: authUser.email,
                  ...userData
                }));
              } else {
                // User exists in auth but not in database
                setUser({
                  id: authUser.id,
                  email: authUser.email,
                  needsProfileSetup: true
                });
                setNeedsProfileCompletion(true);
              }
            } catch (dbError) {
              console.error('Error fetching user data:', dbError);

              // Fall back to auth user data only
              setUser({
                id: authUser.id,
                email: authUser.email,
                needsProfileSetup: true,
                fetchError: dbError.message
              });
              setNeedsProfileCompletion(true);
            }
          } else {
            // User is signed out
            setUser(null);
            localStorage.removeItem('user');
            setNeedsProfileCompletion(false);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    );

    setLoading(false);

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Function to register a new user
  const registerUser = async (email, password, userData) => {
    setLoading(true);
    try {
      // Use the dedicated auth function for registration
      const { success, user: registeredUser, error } = await registerWithEmail(email, password, userData);

      if (!success || error) throw error || new Error('Registration failed');

      if (registeredUser) {
        // Check if the user needs email verification
        if (registeredUser.needsEmailConfirmation) {
          // Handle unverified user state
          setUser({
            ...registeredUser,
            isUnverified: true
          });

          // This is a special state - they're registered but need to verify email
          localStorage.setItem('pendingVerification', JSON.stringify({
            email,
            userId: registeredUser.id,
            timestamp: new Date().toISOString()
          }));

          return {
            user: registeredUser,
            needsEmailVerification: true
          };
        }

        // Normal registration flow for users who don't need verification
        setUser(registeredUser);
        localStorage.setItem('user', JSON.stringify(registeredUser));

        return {
          user: registeredUser
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to login a user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // getUserData is called by the auth listener
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to logout a user
  const logoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    }
  };

  // Function to update user profile
  const updateProfile = async (userData) => {
    try {
      if (!user?.id) throw new Error('User not authenticated');

      // Update in Supabase database
      await updateUserData(user.id, userData);

      // Update local state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Add the missing updateRegistrationStep function
  const updateRegistrationStep = async (userId, step, userData = {}) => {
    try {
      // Update the user in Supabase
      await updateUserData(userId, {
        ...userData,
        registrationStep: step,
        updatedAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error("Error updating registration step:", error);
      throw error;
    }
  };

  // Add a function to handle registration step progression
  const progressRegistration = async (step, userData) => {
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      // Update the backend
      await updateRegistrationStep(user.id, step, userData);

      // Update local state
      setCurrentRegistrationStep(step);
      setNeedsProfileCompletion(step < 4);

      // Update the user object with new data
      setUser(prev => ({
        ...prev,
        ...userData,
        registrationStep: step,
        registrationComplete: step >= 4
      }));

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Login with user data
  const loginUserWithUserData = (userData, options = {}) => {
    setUser(userData);

    if (options.needsProfileCompletion) {
      // Mark profile completion needed for incomplete users
      setNeedsProfileCompletion(true);
    } else {
      setNeedsProfileCompletion(false);
    }

    setShowRegistration(false);
    // No automatic redirection
  };

  // Modify the signOut method to be more thorough
  const logoutUserWithUserData = async () => {
    try {
      debugLog('UserContext', 'Signing out user', user?.id || 'unknown');
      await supabase.auth.signOut();

      // Clear all user data from storage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('temporaryUserData');
      sessionStorage.removeItem('userSession');

      // Reset all user-related state
      setUser(null);
      setNeedsProfileCompletion(false);
      setIncompleteRegistration(null);
      setCurrentRegistrationStep(0);
      setError(null);

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
      throw error;
    }
  };

  // User profile completion function
  const completeUserProfile = async (profileData) => {
    try {
      debugLog('UserContext', 'Completing user profile', profileData);

      // Ensure we have name components
      const firstName = profileData.firstName || user?.firstName || '';
      const lastName = profileData.lastName || user?.lastName || '';
      const fullName = profileData.name || `${firstName} ${lastName}`.trim() || user?.displayName || '';

      // Combine existing user data with completed profile data
      const completeUserData = {
        ...user,
        ...profileData,
        firstName: firstName,
        lastName: lastName,
        name: fullName,
        username: profileData.username || `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        profileComplete: true,
        registrationComplete: true,
        updatedAt: new Date().toISOString()
      };

      // Update user in Supabase
      const updatedUser = await updateUserData(user.id, completeUserData);

      // Update local state
      setUser(updatedUser);
      setNeedsProfileCompletion(false);

      return updatedUser;
    } catch (error) {
      console.error("Error completing user profile:", error);
      throw error;
    }
  };

  // Additional helper functions
  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  const updateUserState = (userData) => {
    setUser(currentUser => {
      if (!currentUser) return userData;
      return { ...currentUser, ...userData };
    });
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    showRegistration,
    needsProfileCompletion,
    currentRegistrationStep,
    loginUser,
    logoutUser,
    registerUser,
    toggleRegistration,
    updateProfile,
    updateUserState,
    setIncompleteRegistration,
    incompleteRegistration,
    setCurrentRegistrationStep
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
