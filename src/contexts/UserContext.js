import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  // Load user from localStorage on initial render
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
    setLoading(false);
  }, []);

  // Function to log in a user
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
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

  // Context value
  const value = {
    user,
    loading,
    showRegistration,
    loginUser,
    logoutUser,
    toggleRegistration
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
