// Firestore helper functions for user registration and profile
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './index';

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
      // Store email in a separate collection for easy lookup
      const normalizedEmail = profileData.email.toLowerCase().trim();
      const emailDocRef = doc(db, 'users_by_email', normalizedEmail);
      await setDoc(emailDocRef, {
        uid: uid,
        email: normalizedEmail,
        createdAt: new Date()
      });
    }

    // Create reference to the custom document ID
    const userDocRef = doc(db, 'users', docId);

    // Include both the custom ID and the UID in the saved data for reference
    await setDoc(userDocRef, {
      ...profileData,
      originalUid: uid,
      displayDocId: docId
    }, { merge: true });

    return docId;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}
