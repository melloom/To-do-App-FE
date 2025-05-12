import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './firebase';
import { storeUserData, getUserData } from './firestore';

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
      createdAt: new Date().toISOString()
    };
    
    // Store user data in Firestore
    await storeUserData(formattedUserData);
    
    return {
      user: formattedUserData
    };
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    const { user } = userCredential;
    
    // Get additional user data from Firestore
    const userData = await getUserData(user.uid);
    
    return {
      userData: userData || {
        uid: user.uid,
        email: user.email
      }
    };
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    
    // Check if user already exists in Firestore
    let userData = await getUserData(user.uid);
    
    // If user doesn't exist, create a new profile
    if (!userData) {
      const newUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'Google User',
        username: user.displayName ? user.displayName.toLowerCase().replace(/\s+/g, '_') : `user_${Math.floor(Math.random() * 10000)}`,
        color: '#ef4444',
        createdAt: new Date().toISOString()
      };
      
      // Store user data in Firestore
      await storeUserData(newUser);
      userData = newUser;
    }
    
    return {
      user: userData
    };
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
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
