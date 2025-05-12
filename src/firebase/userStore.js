/**
 * Module for handling user data storage
 * This module provides functions for handling user data persistence in Firestore
 */
import { 
  doc, 
  setDoc, 
  collection,
  query,
  getDocs,
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Store user data with creation timestamp
 */
export const storeUserData = async (userData) => {
  try {
    // Ensure user data has required fields
    const userWithTimestamp = {
      ...userData,
      username: userData.username || 
                userData.name?.toLowerCase().replace(/\s+/g, '_') || 
                userData.email.split('@')[0],
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };

    // Store user data in Firestore
    const userRef = doc(firestore, 'users', userData.uid);
    await setDoc(userRef, userWithTimestamp);

    console.log('User data stored in Firestore:', userWithTimestamp);
    return userWithTimestamp;
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

/**
 * Get user data by ID
 */
export const getUserData = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

/**
 * Get all users (for admin purposes)
 */
export const getAllUsers = async () => {
  try {
    const usersQuery = query(collection(firestore, 'users'));
    const querySnapshot = await getDocs(usersQuery);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

/**
 * Update user data
 */
export const updateUserData = async (userId, newData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    
    // Check if user exists
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    // Update user data
    await updateDoc(userRef, {
      ...newData,
      updatedAt: serverTimestamp()
    });
    
    // Get updated user data
    const updatedDoc = await getDoc(userRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export default {
  storeUserData,
  getUserData,
  getAllUsers,
  updateUserData
};
