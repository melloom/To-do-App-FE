import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  observeAuthState,
  signOut,
  registerWithEmail as firebaseRegisterUser,
  signInWithEmail as firebaseLoginUser,
  updateUserProfile
} from '../firebase/auth';
import { getUserData, updateUserData, createUserProfile } from '../firebase/firestore';
import { logAuthDebugInfo } from '../firebase/securityHelper';
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
    const unsubscribe = observeAuthState(async (authUser, userData) => {
      setLoading(true);
      try {
        if (authUser) {
          // User is signed in
          setUser(userData || {
            id: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || ''
          });

          // Check if profile needs completion
          setNeedsProfileCompletion(userData ? !userData.profileComplete : true);

          // No need to show registration if user exists
          setShowRegistration(false);
        } else {
          // User is signed out
          setUser(null);
          setNeedsProfileCompletion(false);
        }
      } catch (err) {
        console.error('Error in auth state observer:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Register a new user
  const registerUser = async (userData) => {
    try {
      // Extract name components
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || '';
      const fullName = userData.name || `${firstName} ${lastName}`.trim();

      // Ensure we have a username and creation timestamp
      const newUser = {
        ...userData,
        uid: userData.uid || Date.now().toString(),
        firstName: firstName,
        lastName: lastName,
        name: fullName,
        username: userData.username ||
                  `${firstName.toLowerCase()}_${lastName.toLowerCase()}` ||
                  fullName.toLowerCase().replace(/\s+/g, '_') ||
                  userData.email.split('@')[0],
        registeredAt: userData.createdAt || new Date().toISOString(),
        profileComplete: true,
        registrationStep: 4, // User has completed all registration steps
        registrationComplete: true
      };

      // Get any existing users and save to localStorage
      const existingUsersStr = localStorage.getItem('registeredUsers');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      // Set as current user but don't navigate
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      setShowRegistration(false);

      // Return user without redirection
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Add the missing updateRegistrationStep function
  const updateRegistrationStep = async (userId, step, userData = {}) => {
    try {
      // Update the user in Firestore
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
      if (!user || !user.uid) {
        throw new Error("User not authenticated");
      }

      // Update the backend
      await updateRegistrationStep(user.uid, step, userData);

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
  const loginUser = (userData, options = {}) => {
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
  const logoutUser = async () => {
    try {
      debugLog('UserContext', 'Signing out user', user?.uid || 'unknown');
      await signOut();
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

      // Update user in Firebase
      const updatedUser = await updateUserData(user.uid, completeUserData);

      // Update local state
      setUser(updatedUser);
      setNeedsProfileCompletion(false);

      return updatedUser;
    } catch (error) {
      console.error("Error completing user profile:", error);
      throw error;
    }
  };

  // Update the context value to ensure signOut is properly exposed
  const value = {
    user,
    loading,
    error,
    showRegistration,
    needsProfileCompletion,
    loginUser,
    signOut: logoutUser, // Make sure we're using the updated logout function
    registerWithEmail: async (email, password, userData) => {
      // ...existing code - but don't redirect at the end...
    },
    signInWithEmail: async (email, password) => {
      // ...existing code - but don't redirect at the end...
    },
    completeUserProfile,
    showRegistrationForm: () => setShowRegistration(true),
    hideRegistrationForm: () => setShowRegistration(false),
    currentRegistrationStep,
    progressRegistration,
    // New method that indicates registration is complete but doesn't redirect
    registrationComplete: true
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
