/**
 * Helper functions for Firebase security and permissions
 */
import { auth, firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Check if the current user has permissions to access a specific Firestore path
 * Useful for debugging permission issues
 */
export const checkFirestorePermission = async (path) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return false;
    }

    console.log(`Checking permissions for path: ${path} for user: ${user.uid}`);
    const docRef = doc(firestore, path);
    await getDoc(docRef);

    // If we got here without errors, permissions are good
    console.log('Permission check successful');
    return true;
  } catch (error) {
    console.error('Permission check failed:', error.message);
    return false;
  }
};

/**
 * Check if the current user has all required authentication scopes
 */
export const checkAuthScopes = () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('No user is signed in');
    return { hasAllScopes: false, scopes: [] };
  }

  // Get Google provider data if available
  const googleProvider = user.providerData.find(
    provider => provider.providerId === 'google.com'
  );

  if (!googleProvider) {
    console.warn('User is not signed in with Google');
    return { hasAllScopes: false, scopes: [] };
  }

  // Enhanced Google provider info with additional useful data
  const enhancedProviderInfo = {
    ...googleProvider,
    firstName: googleProvider.displayName ? googleProvider.displayName.split(' ')[0] : '',
    lastName: googleProvider.displayName ? googleProvider.displayName.split(' ').slice(1).join(' ') : '',
    isGoogleAccount: true
  };

  // Log provider info for debugging
  console.log('Google provider data:', enhancedProviderInfo);

  return {
    hasAllScopes: true,
    provider: enhancedProviderInfo
  };
};

/**
 * Log detailed auth information for debugging
 */
export const logAuthDebugInfo = async () => {
  try {
    console.group('Firebase Auth Debug Info');

    // Check current user
    const currentUser = auth.currentUser;
    console.log('Current user:', currentUser ? {
      uid: currentUser.uid,
      email: currentUser.email,
      emailVerified: currentUser.emailVerified,
      isAnonymous: currentUser.isAnonymous,
      providerData: currentUser.providerData
    } : 'No user signed in');

    // Try a simple read operation to test permissions
    if (currentUser) {
      try {
        const userRef = doc(firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        console.log('User document exists:', userDoc.exists());
        console.log('User document access successful');
      } catch (error) {
        console.error('Error accessing user document:', error.code, error.message);
      }
    }

    console.groupEnd();

    return currentUser ? true : false;
  } catch (error) {
    console.error('Auth debug error:', error);
    return false;
  }
};

/**
 * Diagnose Google authentication issues
 * This can help identify configuration problems with Firebase Google auth
 */
export const diagnoseGoogleAuth = async () => {
  try {
    console.group('Google Auth Diagnostics');

    // Check if Firebase auth is initialized
    const isFirebaseInitialized = auth.app !== null;
    console.log('Firebase Auth Initialized:', isFirebaseInitialized);

    // Check if we're on an authorized domain
    const currentDomain = window.location.hostname;
    console.log('Current Domain:', currentDomain);
    console.log('Is localhost:', currentDomain === 'localhost' || currentDomain === '127.0.0.1');

    // Try to create a GoogleAuthProvider to check for provider errors
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      provider.addScope('openid');
      console.log('Google Auth Provider created successfully');
    } catch (providerError) {
      console.error('Error creating Google Auth Provider:', providerError);
    }

    console.groupEnd();

    return {
      isFirebaseInitialized,
      currentDomain,
      isLocalhost: currentDomain === 'localhost' || currentDomain === '127.0.0.1'
    };
  } catch (error) {
    console.error('Failed to diagnose Google auth issues:', error);
    throw error;
  }
};

/**
 * Handles Firebase permission errors with helpful messages
 */
export const handlePermissionError = (error, operation = 'operation') => {
  if (error.code === 'permission-denied' ||
      error.code === 'storage/unauthorized' ||
      error.message?.includes('permission')) {

    console.error(`Firebase permission error during ${operation}`, error);

    // Check authentication status
    const isAuthenticated = auth.currentUser !== null;

    // Provide helpful error message based on authentication status
    if (!isAuthenticated) {
      return {
        code: 'auth/not-authenticated',
        message: 'You need to be signed in to perform this action. Please sign in and try again.'
      };
    } else {
      return {
        code: 'permission-denied',
        message: 'You don\'t have permission to perform this action. If this seems incorrect, please contact support.'
      };
    }
  }

  // Return original error if not permission related
  return error;
};

/**
 * Checks and verifies if the current user has required permissions
 * @param {string} collectionPath - The Firestore collection to check
 * @param {string} action - The action type (read, write, delete)
 */
export const verifyPermissions = async (collectionPath, action = 'read') => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    // For basic permission testing, try to access a document
    if (action === 'read' && collectionPath) {
      // Try to read the first document in the collection as a test
      const testQuery = await getDoc(doc(firestore, collectionPath, 'test-permissions'));
      console.log(`Read permission test result: ${testQuery ? 'Success' : 'Failed'}`);
    }

    return true;
  } catch (error) {
    console.error('Permission verification failed:', error);
    return false;
  }
};
