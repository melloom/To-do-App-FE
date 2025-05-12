import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  observeAuthState,
  signOut,
  registerWithEmail as firebaseRegisterUser,
  signInWithEmail as firebaseLoginUser
} from '../firebase/auth';
import { getUserData } from '../firebase/firestore';
import { logAuthDebugInfo } from '../firebase/securityHelper';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [googleRegistrationData, setGoogleRegistrationData] = useState(null); // Add state for Google registration

  // Check for logged in user on initial load and set up auth listener
  useEffect(() => {
    const unsubscribe = observeAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        try {
          // Add debug logging
          logAuthDebugInfo();

          const userData = await getUserData(firebaseUser.uid);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL
          });
        }
      } else {
        // Fallback to checking localStorage for backward compatibility
        const loggedInUser = localStorage.getItem('currentUser');
        if (loggedInUser) {
          setUser(JSON.parse(loggedInUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register a new user
  const registerUser = async (userData) => {
    try {
      // Ensure we have a username and creation timestamp
      const newUser = {
        ...userData,
        id: Date.now(),
        username: userData.username || userData.name?.toLowerCase().replace(/\s+/g, '_') || userData.email.split('@')[0],
        registeredAt: userData.createdAt || new Date().toISOString()
      };

      // Get any existing users and save to localStorage
      const existingUsersStr = localStorage.getItem('registeredUsers');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      // Set as current user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      setShowRegistration(false);

      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Login an existing user
  const loginUser = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout the current user
  const logoutUser = async () => {
    try {
      await signOut();
      localStorage.removeItem('currentUser');
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Add new helper function to update user profile after Google registration
  const updateGoogleUserProfile = async (userData) => {
    try {
      const updatedUser = await updateUserData(userData.uid, userData);
      setUser(updatedUser);
      setGoogleRegistrationData(null); // Clear Google registration data
      return updatedUser;
    } catch (error) {
      console.error("Error updating Google user profile:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      loading,
      showRegistration,
      setShowRegistration,
      registerUser,
      loginUser,
      logoutUser,
      googleRegistrationData,
      setGoogleRegistrationData,
      updateGoogleUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
