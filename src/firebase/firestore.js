// Firestore helper functions for user registration and profile
import { db } from './index';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Check if email already exists in Firestore
export async function checkEmailExists(email) {
  try {
    if (!email) return false;
    
    // Normalize email to lowercase for consistent checks
    const normalizedEmail = email.toLowerCase().trim();
    const emailDocRef = doc(db, 'users_by_email', normalizedEmail);
    const emailDoc = await getDoc(emailDocRef);
    
    return emailDoc.exists();
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
}

// Save user profile data to Firestore
export async function saveUserProfile(uid, profileData) {
  try {
    // Create a custom document ID using the user's name
    const docId = profileData.name ? `${profileData.name.replace(/\s+/g, '_')}_${uid.slice(-6)}` : uid;
      // Check if email already exists
    if (profileData.email) {
      const normalizedEmail = profileData.email.toLowerCase().trim();
      const emailExists = await checkEmailExists(normalizedEmail);
      if (emailExists) {
        throw new Error('This email is already registered. Please use a different email address.');
      }
      
      // Add email to index collection for uniqueness checks
      const emailDocRef = doc(db, 'users_by_email', normalizedEmail);
      await setDoc(emailDocRef, {
        uid: uid,
        profileDocId: docId,
        createdAt: new Date().toISOString()
      });
    }
    
    // Create reference to the custom document ID
    const userDocRef = doc(db, 'users', docId);
    
    // Include both the custom ID and the UID in the saved data for reference
    await setDoc(userDocRef, {
      ...profileData,
      originalUid: uid,
      displayDocId: docId // Store the document ID for display purposes
    }, { merge: true });
    
    // Also add a reference document using the original UID for authentication lookups
    if (docId !== uid) {
      const uidRef = doc(db, 'users', uid);
      await setDoc(uidRef, { 
        referenceDocId: docId,
        name: profileData.name
      }, { merge: true });
    }
    
    return docId;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}
