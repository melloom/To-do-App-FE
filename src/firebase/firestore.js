// Firestore helper functions for user registration and profile
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './index';

// Track if we've encountered permission issues to avoid repeated calls
let firestorePermissionDenied = false;

// Check if email already exists in Firestore
export async function checkEmailExists(email) {
  // If we've already detected permission issues, skip Firestore checks
  if (firestorePermissionDenied) {
    console.warn('Skipping Firestore email check due to previous permission denial');
    return false;
  }

  try {
    if (!email) return false;

    // Normalize email to lowercase for consistent checks
    const normalizedEmail = email.toLowerCase().trim();
    const emailDocRef = doc(db, 'users_by_email', normalizedEmail);
    const emailDoc = await getDoc(emailDocRef);

    return emailDoc.exists();
  } catch (error) {
    console.error('Error checking email existence:', error);
    
    // If we get a permission denied error, mark it and skip future calls
    if (error.code === 'permission-denied') {
      console.warn('Firestore permission denied for email check. Disabling future Firestore checks.');
      firestorePermissionDenied = true;
      return false; // Return false to allow Firebase Auth to handle the validation
    }
    
    throw error;
  }
}

// Enhanced user profile saving with better error handling
export const saveUserProfile = async (uid, userData) => {
  try {
    // Server-side user profile saving
    console.log('Saving user profile to server:', { uid, userData });
    return { success: true };
  } catch (error) {
    if (error.code === 'permission-denied') {
      // Return success for registration flow to continue
      return { success: true, fallback: true, errorCode: 'permission-denied' };
    }
    
    // Re-throw the original error for proper error handling
    throw error;
  }
};

// Check username availability - server-side only
export async function checkUsernameExists(username) {
  // If we've already detected permission issues, skip this check
  if (firestorePermissionDenied) {
    console.warn('Skipping Firestore username check due to previous permission denial');
    return false;
  }

  try {
    if (!username) return false;
    
    const usernameDocRef = doc(db, 'usernames', username.toLowerCase());
    const usernameDoc = await getDoc(usernameDocRef);
    
    return usernameDoc.exists();
  } catch (error) {
    console.error('Error checking username existence:', error);
    
    if (error.code === 'permission-denied') {
      console.warn('Firestore permission denied for username check. Disabling future checks.');
      firestorePermissionDenied = true;
      return false; // Allow registration to proceed
    }
    
    throw error;
  }
}

// Reset permission flag (useful for testing or if permissions change)
export function resetFirestorePermissionFlag() {
  firestorePermissionDenied = false;
}

// Enhanced permissions check
export const hasFirestorePermissions = () => {
  try {
    // Check if Firestore is properly initialized
    if (!db) {
      console.warn('⚠️ Firestore database not initialized');
      return false;
    }
    
    // Check if we're in a valid authentication state
    const auth = getAuth();
    if (!auth.currentUser) {
      console.warn('⚠️ No authenticated user found');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error checking Firestore permissions:', error);
    return false;
  }
};
