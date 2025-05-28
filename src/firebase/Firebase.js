import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, collection, query, where, limit, getDocs, setDoc, updateDoc } from 'firebase/firestore';
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

// Helper function to handle OAuth user profile creation
const handleOAuthUserProfile = async (user, provider) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        provider: provider,
        registrationComplete: false
      });
      console.log("New user profile created in Firestore");
    } else {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString()
      });
    }
  } catch (error) {
    console.log("Error storing user data in Firestore:", error);
  }
};

// Enhanced Google Authentication with better popup handling and COOP policy fixes
export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
  
  // Optimized parameters to prevent COOP policy issues
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    display: 'popup',
    include_granted_scopes: 'true'
  });
  
  return signInWithPopup(auth, googleProvider)
  .then(async (result) => {
    const user = result.user;
    console.log('Google OAuth successful, user:', user);
    
    // Set OAuth flags for registration flow
    sessionStorage.setItem('oauthRegistrationInProgress', 'true');
    sessionStorage.setItem('oauthProvider', 'google');
    
    // Handle user profile creation
    await handleOAuthUserProfile(user, 'google');
    
    return result;
  })
  .catch(error => {
    console.error('Google sign-in error:', error);
    
    // Clear OAuth flags on error
    sessionStorage.removeItem('oauthRegistrationInProgress');
    sessionStorage.removeItem('oauthProvider');
    
    // Handle specific error cases
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your connection and try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('This domain is not authorized for OAuth operations.');
    } else {
      throw error;
    }
  });
};

// GitHub Authentication
export const signInWithGithub = () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope('user:email');
  githubProvider.addScope('read:user');
  githubProvider.setCustomParameters({
    prompt: 'select_account',
    allow_signup: 'true'
  });
  
  return signInWithPopup(auth, githubProvider)
  .then(async (result) => {
    const user = result.user;
    
    // Set OAuth flags for registration flow
    sessionStorage.setItem('oauthRegistrationInProgress', 'true');
    sessionStorage.setItem('oauthProvider', 'github');
    
    // Handle user profile creation
    await handleOAuthUserProfile(user, 'github');
    
    return result;
  })
  .catch(error => {
    console.error('GitHub sign-in error:', error);
    
    // Clear OAuth flags on error
    sessionStorage.removeItem('oauthRegistrationInProgress');
    sessionStorage.removeItem('oauthProvider');
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw error;
    }
  });
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
    if (!auth.currentUser) {
      return { data: { name: 'Guest', email: null } };
    }

    const currentUser = auth.currentUser;
    
    return { 
      data: { 
        name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User', 
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid
      } 
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    const currentUser = auth.currentUser;
    return { 
      data: { 
        name: currentUser?.displayName || 'User', 
        email: currentUser?.email || null,
        photoURL: currentUser?.photoURL || null,
        uid: currentUser?.uid || null
      },
      error: error.message 
    };
  }
};

// Create user profile with comprehensive error handling
export const createUserProfile = async (userId, profileData) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    console.log('Creating profile for user:', userId, profileData);
    
    const completeProfileData = {
      uid: userId,
      email: profileData.email || '',
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      displayName: profileData.displayName || `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
      dateOfBirth: profileData.dateOfBirth || '',
      bio: profileData.bio || '',
      photoURL: profileData.photoURL || '',
      provider: profileData.provider || 'email',
      registrationComplete: true,
      profileCreatedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      createdAt: profileData.createdAt || new Date().toISOString()
    };
    
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, completeProfileData, { merge: true });
    
    console.log('Profile created/updated successfully');
    return { 
      success: true, 
      data: completeProfileData 
    };
    
  } catch (error) {
    console.error('Error creating user profile:', error);
    
    return { 
      success: false, 
      error: error.message || 'Failed to create profile',
      details: error
    };
  }
};

// Update user profile
export const updateUserProfile = async (userId, updateData) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const userRef = doc(db, 'users', userId);
    const updatePayload = {
      ...updateData,
      lastUpdated: new Date().toISOString()
    };
    
    await updateDoc(userRef, updatePayload);
    
    return { 
      success: true, 
      data: updatePayload 
    };
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update profile' 
    };
  }
};

export default auth;
