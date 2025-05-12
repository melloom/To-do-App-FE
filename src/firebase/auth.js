import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import { handlePermissionError, logAuthDebugInfo } from './securityHelper';

// Add this function for auth state observation
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email, password, userData) => {
  try {
    // Create the Firebase user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Format user data with UID from Firebase
    const formattedUserData = {
      ...userData,
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: serverTimestamp()
    };

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
 * Sign in with Google with enhanced error handling
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    // Add more comprehensive scopes for better permissions
    provider.addScope('email');
    provider.addScope('profile');

    // Set custom parameters for persistence
    provider.setCustomParameters({
      'prompt': 'select_account',
      'auth_type': 'reauthenticate'
    });

    console.log("Attempting Google sign-in...");
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    // Log debug info
    await logAuthDebugInfo();

    // Check if user already exists in Firestore
    let userData = await fetchUserData(user.uid);

    // If user doesn't exist, create a new profile
    if (!userData) {
      try {
        console.log("Creating new user profile for Google user");
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Google User',
          username: user.displayName ? user.displayName.toLowerCase().replace(/\s+/g, '_') : `user_${Math.floor(Math.random() * 10000)}`,
          color: '#ef4444',
          createdAt: new Date().toISOString(),
          updatedAt: serverTimestamp(),
          authProvider: 'google'
        };

        // Store user data in Firestore
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, newUser);
        userData = newUser;
      } catch (error) {
        console.error("Error creating user profile:", error);
        const handledError = handlePermissionError(error, 'user creation');
        throw handledError;
      }
    }

    return {
      user: userData,
      isGoogleSignIn: true,  // Add a flag to indicate this is a Google sign-in
      googleUserInfo: {      // Include Google-specific information for form pre-filling
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        firstName: user.displayName ? user.displayName.split(' ')[0] : '',
        lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
        photoURL: user.photoURL
      }
    };
  } catch (error) {
    console.error('Google Sign-in Error:', error.code, error.message);

    // Handle specific Google auth errors
    if (error.code === 'auth/operation-not-allowed' ||
        error.code === 'auth/configuration-not-found' ||
        error.message.includes('Google')) {
      error.message = 'Authentication Error: Your Firebase project does not have Google authentication properly configured. Please ensure Google sign-in is enabled in Firebase Console.';
    } else if (error.code === 'auth/unauthorized-domain') {
      error.message = 'Authentication Error: This domain is not authorized. Please add this domain to your Firebase Authentication settings.';
    } else if (error.code === 'permission-denied') {
      error.message = 'Missing or insufficient permissions. Please check your Firebase security rules and authentication status.';
    }

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
