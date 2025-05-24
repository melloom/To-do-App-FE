import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from './index';

// Auth functions
export { auth, db, storage };

// Login with email and password
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Register with email and password
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// GitHub Authentication
export const signInWithGithub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider);
};

// Send password reset email
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Logout user
export const logoutUser = () => {
  return signOut(auth);
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    // Implement your Firestore logic to fetch user profile
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      return { data: userDoc.data() };
    }

    // Try to find user by UID field if not found by document ID
    const usersSnapshot = await db.collection('users')
                                  .where('originalUid', '==', userId)
                                  .limit(1)
                                  .get();

    if (!usersSnapshot.empty) {
      return { data: usersSnapshot.docs[0].data() };
    }

    // Fall back to basic information
    return { data: { name: 'User', email: auth.currentUser?.email } };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error };
  }
};

export default auth;
