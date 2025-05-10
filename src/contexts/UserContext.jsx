import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Check for logged in user on initial load
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
  
  // Register a new user
  const registerUser = (userData) => {
    // Get any existing users
    const existingUsersStr = localStorage.getItem('registeredUsers');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    
    // Create the new user with ID
    const newUser = {
      ...userData,
      id: Date.now(),
      registeredAt: new Date().toISOString()
    };
    
    // Save to users array
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    setShowRegistration(false);
  };
  
  // Login an existing user
  const loginUser = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };
  
  // Logout the current user
  const logoutUser = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      showRegistration, 
      setShowRegistration, 
      registerUser,
      loginUser,
      logoutUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
