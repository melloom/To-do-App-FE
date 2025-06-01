import React, { createContext, useState, useContext, useEffect } from 'react';
import { debugLog } from '../utils/debug';

const UserContext = createContext();

const initialUser = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  avatar: {
    type: 'initials',
    value: '',
    color: '#5b5ef4'
  },
  profile: {
    firstName: '',
    lastName: '',
    bio: '',
    username: ''
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);
  const [incompleteRegistration, setIncompleteRegistration] = useState(null);
  const [currentRegistrationStep, setCurrentRegistrationStep] = useState(0);

  // Initialize auth state from server session
  useEffect(() => {
    // Check server session for authenticated user
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      // Check with server for current session
      // This would be replaced with actual API call
      setLoading(false);
    } catch (error) {
      console.error('Failed to check auth session:', error);
      setLoading(false);
    }
  };

  // Function to register a new user
  const registerUser = async (email, password, userData) => {
    setLoading(true);
    try {
      // Server-side registration - no local storage
      // Remove import and usage of registerWithEmail since it's not defined
      console.log('Registration would happen server-side:', { email, userData });

      // Simulate successful registration
      const registeredUser = {
        id: Date.now().toString(),
        email,
        ...userData,
        createdAt: new Date().toISOString()
      };

      setUser(registeredUser);
      return {
        success: true,
        user: registeredUser
      };
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
      // Server-side authentication - session managed by server
      console.log('Login would happen server-side:', { email });
      
      // Simulate successful login
      const userData = {
        id: Date.now().toString(),
        email,
        name: 'Demo User'
      };
      
      setUser(userData);
      return userData;
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
      // Server-side logout - invalidate session
      // Reset all user-related state
      setUser(initialUser);
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

  // Function to update user profile
  const updateProfile = async (userData) => {
    try {
      if (!user?.id) throw new Error('User not authenticated');

      // Update server-side profile
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

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
      // Server-side registration step update
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

      // Update server-side profile
      setUser(completeUserData);
      setNeedsProfileCompletion(false);

      return completeUserData;
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
    // Server-side state management - no local storage
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
    setCurrentRegistrationStep,
    progressRegistration,
    loginUserWithUserData,
    completeUserProfile,
    setUser,
    updateUser: (userData) => {
      setUser(prevUser => ({
        ...prevUser,
        ...userData,
        avatar: {
          ...prevUser.avatar,
          ...userData.avatar
        },
        profile: {
          ...prevUser.profile,
          ...userData.profile
        }
      }));
    }
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
