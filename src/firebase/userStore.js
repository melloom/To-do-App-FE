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
 * Stores temporary user data in local storage, not in Firebase
 * @param {Object} userData User data to store temporarily
 */
export const storeTemporaryUserData = (userData) => {
  if (!userData) return;

  try {
    localStorage.setItem('temporaryUserData', JSON.stringify({
      ...userData,
      storedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error storing temporary user data:', error);
  }
};

/**
 * Retrieves temporary user data from local storage
 * @returns {Object|null} Temporary user data or null if not found
 */
export const getTemporaryUserData = () => {
  try {
    const data = localStorage.getItem('temporaryUserData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving temporary user data:', error);
    return null;
  }
};

/**
 * Clears temporary user data from local storage
 */
export const clearTemporaryUserData = () => {
  try {
    localStorage.removeItem('temporaryUserData');
  } catch (error) {
    console.error('Error clearing temporary user data:', error);
  }
};

/**
 * Store user data with creation timestamp
 */
export const storeUserData = async (userData) => {
  try {
    // Generate fullName from firstName and lastName if needed
    const fullName = userData.name ||
                    (userData.firstName && userData.lastName ?
                      `${userData.firstName} ${userData.lastName}` :
                      userData.displayName || '');

    // Ensure user data has required fields
    const userWithTimestamp = {
      ...userData,
      firstName: userData.firstName || (fullName ? fullName.split(' ')[0] : ''),
      lastName: userData.lastName || (fullName ? fullName.split(' ').slice(1).join(' ') : ''),
      name: fullName,
      username: userData.username ||
                `${userData.firstName?.toLowerCase() || ''}${userData.lastName ? '_' + userData.lastName.toLowerCase() : ''}` ||
                fullName?.toLowerCase().replace(/\s+/g, '_') ||
                userData.email.split('@')[0],
      createdAt: userData.createdAt || serverTimestamp(), // Use serverTimestamp instead of ISO string
      updatedAt: serverTimestamp(),
      // Ensure all registration fields are included
      color: userData.color || '#5b5ef4',
      bio: userData.bio || '',
      profileVisibility: userData.profileVisibility || 'public',
      referralSource: userData.referralSource || '',
      usagePurpose: userData.usagePurpose || '',
      referralCode: userData.referralCode || '',
      profileComplete: userData.profileComplete || false,
      authProvider: userData.authProvider || 'email'
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
export const getUserDataById = async (userId) => {
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
 * Update user data ensuring all fields are preserved
 */
export const updateUserData = async (userId, newData) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    // Check if user exists
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    // Current user data
    const currentData = userDoc.data();

    // Update user data with merged fields
    const updatedData = {
      ...currentData,
      ...newData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(userRef, updatedData);

    // Get updated user data
    const updatedDoc = await getDoc(userRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

/**
 * Check if a user exists in Firestore
 * @param {string} uid - User ID to check
 * @returns {Promise<boolean>} Whether the user exists
 */
export const checkUserExists = async (uid) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};

/**
 * Get user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User data
 */
export const getUserData = async (uid) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn('User document not found for ID:', uid);
      return null;
    }

    return {
      ...userSnap.data(),
      id: uid
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Check if this is a permissions error
    if (error.code === 'permission-denied') {
      console.error('Permission denied. User may be missing required fields');
    }
    throw error;
  }
};

export default {
  storeUserData,
  getUserData,
  getUserDataById,
  getAllUsers,
  updateUserData,
  storeTemporaryUserData,
  getTemporaryUserData,
  clearTemporaryUserData,
  checkUserExists
};
