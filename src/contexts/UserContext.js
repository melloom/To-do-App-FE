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
    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        try {
          console.log('Auth state changed - user:', authUser.uid);
          
          // Check if user is currently on registration pages
          const currentPath = window.location.pathname;
          const isOnRegistrationPage = currentPath.includes('/register') || 
                                      currentPath.includes('/registration') ||
                                      currentPath.includes('/step');
          
          if (isOnRegistrationPage) {
            console.log('User is on registration page, not auto-navigating');
            setLoading(false);
            return;
          }
          
          // Get additional user data from server
          const { data: userData, error } = await getUserProfile(authUser.uid);

          if (userData && userData.registrationComplete) {
            // User has completed registration, set full user data
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
            
            // Server-side session management - no localStorage usage
          } else {
            // User exists but hasn't completed registration
            console.log('User authenticated but registration not complete');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        // Server-side session cleanup - no localStorage usage
      }

      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loginUser = (userData, additionalData = {}) => {
    setUser({...userData, ...additionalData});
    setShowRegistration(false);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
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
    return updatedUser;
  };

  const updateUserData = (data) => {
    setUser((current) => current ? { ...current, ...data } : data);
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
