import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, onAuthStateChange, getUserProfile, logoutUser } from '../firebase/Firebase';

export const UserContext = createContext();

// Add useUser custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }

    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        try {
          // Get additional user data from Firestore
          const { data: userData, error } = await getUserProfile(authUser.uid);

          if (userData) {
            // Convert any snake_case properties to camelCase
            const formattedUserData = Object.entries(userData).reduce((acc, [key, value]) => {
              const camelKey = key.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
              acc[camelKey] = value;
              return acc;
            }, {});

            const userInfo = {
              id: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...formattedUserData
            };

            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }

      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loginUser = (userData, additionalData = {}) => {
    setUser({...userData, ...additionalData});
    localStorage.setItem('user', JSON.stringify({...userData, ...additionalData}));
    setShowRegistration(false);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  const updateUserProfile = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const updateUserData = (data) => {
    setUser((current) => current ? { ...current, ...data } : data);
    if (user) {
      localStorage.setItem('user', JSON.stringify({...user, ...data}));
    }
  };

  const value = {
    user,
    loading,
    showRegistration,
    loginUser,
    logoutUser: logout,
    toggleRegistration,
    updateUserProfile,
    updateUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
