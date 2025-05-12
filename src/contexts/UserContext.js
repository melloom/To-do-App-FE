import React, { createContext, useState, useContext, useEffect } from 'react';
import { observeAuthState } from '../firebase/auth';

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  // Load user from localStorage and listen for auth state changes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Set up Firebase auth listener
    const unsubscribe = observeAuthState((firebaseUser) => {
      if (!firebaseUser) {
        // User is signed out
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  // Function to log in a user
  const loginUser = (userData, additionalInfo = {}) => {
    setUser({ ...userData, ...additionalInfo });
    localStorage.setItem('user', JSON.stringify({ ...userData, ...additionalInfo }));
    setShowRegistration(false);
  };

  // Function to log out
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Function to toggle registration form
  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  // Function to update user profile
  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  // Add this new function to update user data
  const updateUserData = (userData) => {
    setUser(currentUser => {
      if (!currentUser) return userData;
      return { ...currentUser, ...userData };
    });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Context value
  const value = {
    user,
    loading,
    showRegistration,
    loginUser,
    logoutUser,
    toggleRegistration,
    updateUserProfile,
    updateUserData // Add the new function to the context value
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
