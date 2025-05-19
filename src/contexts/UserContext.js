import React, { createContext, useState, useContext, useEffect } from 'react';
<<<<<<< HEAD
=======
import { supabase } from '../supabase/supabase';
import { getUserData } from '../supabase/database';
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368

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

<<<<<<< HEAD
    setLoading(false);
=======
    // Set up Supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          // User is signed out
          setUser(null);
          localStorage.removeItem('user');
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Get full user profile from the database
          try {
            const userData = await getUserData(session.user.id);
            if (userData) {
              // Convert snake_case to camelCase for frontend consistency
              const formattedUserData = Object.entries(userData).reduce((acc, [key, value]) => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                acc[camelKey] = value;
                return acc;
              }, {});

              setUser(formattedUserData);
              localStorage.setItem('user', JSON.stringify(formattedUserData));
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
              setLoading(false);
      }
    );

    setLoading(false);

    return () => {
      subscription?.unsubscribe();
    }; // Clean up the subscription
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
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
