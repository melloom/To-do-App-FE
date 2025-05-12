import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getAuth
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import { handlePermissionError, logAuthDebugInfo } from './securityHelper';
import { debugLog } from '../utils/debug';

// Add this function for auth state observation
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email, password, userData) => {
  try {
    debugLog('Auth', 'Starting email registration', email);

    // Create the Firebase user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Combine first and last name into a full name
    const fullName = `${userData.firstName} ${userData.lastName}`.trim();

    // Format user data with UID from Firebase
    const formattedUserData = {
      ...userData,
      uid: user.uid,
      email: user.email,
      // Store both individual name components and full name
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: fullName,
      // Generate username if not provided (from profile step)
      username: userData.username || `${userData.firstName.toLowerCase()}_${userData.lastName.toLowerCase()}`,
      // Add discovery and profile data (or defaults)
      referralSource: userData.referralSource || 'Not specified',
      usagePurpose: userData.usagePurpose || 'Not specified',
      referralCode: userData.referralCode || '',
      bio: userData.bio || '',
      profileVisibility: userData.profileVisibility || 'public',
      createdAt: new Date().toISOString(),
      updatedAt: serverTimestamp(),
      registrationStep: 4, // Track which step of registration is complete (1-4)
      registrationComplete: true
    };

    debugLog('Auth', 'Storing user data to Firestore', formattedUserData);

    // Store user data directly to Firestore
    const userRef = doc(firestore, 'users', user.uid);
    await setDoc(userRef, formattedUserData);

    return {
      user: formattedUserData
    };
  } catch (error) {
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Firebase Error: This domain is not authorized in Firebase Console');
      throw new Error('Authentication Error: This domain is not authorized. Please add this domain to your Firebase Authentication settings in the Firebase Console.');
    }
    console.error("Error registering user:", error.message);
    throw error;
  }
};

/**
 * Helper function to get user data
 */
const fetchUserData = async (userId) => {
  const userRef = doc(firestore, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    const { user } = userCredential;

    // Get additional user data from Firestore
    const userData = await fetchUserData(user.uid);

    return {
      userData: userData || {
        uid: user.uid,
        email: user.email
      }
    };
  } catch (error) {
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Firebase Error: This domain is not authorized in Firebase Console');
      throw new Error('Authentication Error: This domain is not authorized. Please add this domain to your Firebase Authentication settings in the Firebase Console.');
    }
    console.error("Error signing in:", error.message);
    throw error;
  }
};

/**
 * Sign in with Google and check for user existence in Firestore
 * @returns {Promise<Object>} User data and authentication status
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // Add relevant scopes
    provider.addScope('email');
    provider.addScope('profile');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document exists in Firestore
    const userRef = doc(firestore, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // Get enhanced user data (common for both new & existing users)
    const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const fullName = user.displayName || '';
    const username = fullName.toLowerCase().replace(/\s+/g, '_') || user.email.split('@')[0];

    if (!userSnap.exists()) {
      // New user - create basic initial record
      const newUserData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        name: fullName,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        username: username,
        // Authentication info
        authProvider: 'google',
        provider: 'google',
        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        // Registration status
        registrationStep: 1,
        registrationComplete: false,
        profileComplete: false
      };

      // Create initial user document
      await setDoc(userRef, newUserData);

      return {
        ...newUserData,
        id: user.uid,
        isNewUser: true,
        needsProfileCompletion: true,
        googleData: {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      };
    } else {
      // Existing user - update login timestamp
      const userData = userSnap.data();

      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Check if user needs to complete profile
      const needsProfileCompletion = !userData.profileComplete;

      return {
        ...userData,
        id: user.uid,
        isExistingUser: true,
        needsProfileCompletion: needsProfileCompletion,
        googleData: {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      };
    }
  } catch (error) {
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Firebase Error: Unauthorized domain', error);
      throw new Error('Authentication Error: This domain is not authorized. Please add this domain to your Firebase Authentication settings in the Firebase Console.');
    }
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Complete Google Registration by updating user profile data
 * @param {Object} userData User data to save
 * @returns {Promise<Object>} Updated user data
 */
export const completeGoogleRegistration = async (userData) => {
  try {
    if (!userData || !userData.uid) {
      throw new Error("Missing user ID");
    }

    const userRef = doc(firestore, 'users', userData.uid);

    // Ensure required fields are present
    const updatedData = {
      ...userData,
      profileComplete: true,
      registrationComplete: true,
      registrationStep: 4,
      updatedAt: serverTimestamp(),
      completedAt: serverTimestamp()
    };

    await updateDoc(userRef, updatedData);

    return {
      ...updatedData,
      id: userData.uid
    };
  } catch (error) {
    console.error("Error completing Google registration:", error);
    throw error;
  }
};

/**
 * Complete Google user profile with additional information
 * @param {Object} profileData The complete profile data
 * @returns {Promise<Object>} Updated user data
 */
export const completeGoogleUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user found');

    const userRef = doc(firestore, 'users', user.uid);

    // Update the user profile with complete information
    const updatedData = {
      ...profileData,
      profileComplete: true,
      registrationComplete: true,
      updatedAt: serverTimestamp()
    };

    await updateDoc(userRef, updatedData);

    return {
      ...updatedData,
      id: user.uid
    };
  } catch (error) {
    console.error('Error completing user profile:', error);
    throw error;
  }
};

/**
 * Updates the user's current registration step
 * @param {string} userId - The user ID
 * @param {number} step - The current registration step
 */
export const updateRegistrationStep = async (userId, step) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      registrationStep: step,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating registration step:", error);
    throw error;
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error resetting password:", error.message);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

// Add this new function to update user profile
export const updateUserProfile = async (userData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No authenticated user found');
    }

    // Update the user document in Firestore
    const userRef = doc(firestore, 'users', currentUser.uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });

    return userData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
