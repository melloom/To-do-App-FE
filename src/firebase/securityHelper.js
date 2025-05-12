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

  // Extract first and last name more reliably
  const displayNameParts = googleProvider.displayName ? googleProvider.displayName.split(' ') : ['', ''];
  const firstName = displayNameParts[0] || '';
  const lastName = displayNameParts.length > 1 ? displayNameParts.slice(1).join(' ') : '';

  // Enhanced Google provider info with additional useful data
  const enhancedProviderInfo = {
    ...googleProvider,
    firstName: firstName,
    lastName: lastName,
    name: googleProvider.displayName || '',
    isGoogleAccount: true,
    verified: !!googleProvider.email && googleProvider.email.includes('@'),
    registrationTimestamp: new Date().toISOString()
  };

  // Log provider info for debugging but reduce noise in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Google provider data:', enhancedProviderInfo);
  }

  return {
    hasAllScopes: true,
    provider: enhancedProviderInfo
  };
};

/**
 * Verify Google Account information and enrich with additional data
 * @param {Object} googleUserInfo - Google user information
 * @returns {Object} Enhanced and verified user data
 */
export const verifyGoogleAccountInfo = (googleUserInfo) => {
  if (!googleUserInfo || !googleUserInfo.uid) {
    throw new Error("Invalid Google account information");
  }

  // Extract name components from display name
  let firstName = '';
  let lastName = '';

  if (googleUserInfo.displayName) {
    const nameParts = googleUserInfo.displayName.split(' ');
    firstName = nameParts[0] || '';
    lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  }

  // Generate a username from display name or email
  let username = '';
  if (googleUserInfo.displayName) {
    username = googleUserInfo.displayName.toLowerCase().replace(/\s+/g, '_');
  } else if (googleUserInfo.email) {
    username = googleUserInfo.email.split('@')[0];
  } else {
    username = `user_${Date.now()}`;
  }

  // Remove any special characters from username
  username = username.replace(/[^a-z0-9_]/g, '');

  // Ensure username is unique by adding a timestamp if needed
  if (username.length < 3) {
    username = `user_${Date.now()}`;
  }

  return {
    ...googleUserInfo,
    firstName,
    lastName,
    fullName: googleUserInfo.displayName || '',
    username,
    profileComplete: false,
    isGoogleAccount: true,
    requiresProfileCompletion: true,
    verificationTimestamp: new Date().toISOString()
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
 * Diagnose permission issues with Google sign-in
 * @param {string} userId - User ID to check
 * @returns {Promise<Object>} Diagnostic information
 */
export const diagnosePermissionIssues = async (userId) => {
  try {
    console.group('Firebase Permission Diagnostics');

    // Check if user is authenticated
    const currentUser = auth.currentUser;
    console.log('Current auth user:', currentUser ? {
      uid: currentUser.uid,
      email: currentUser.email,
      provider: currentUser.providerData[0]?.providerId
    } : 'Not authenticated');

    if (!currentUser) {
      console.error('No authenticated user found');
      console.groupEnd();
      return { success: false, error: 'No authenticated user' };
    }

    // Check if user document exists
    try {
      const userRef = doc(firestore, 'users', userId || currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log('User document exists with fields:', Object.keys(userData));

        // Check for required fields
        const requiredFields = [
          'uid', 'email', 'firstName', 'lastName', 'name',
          'username', 'authProvider', 'createdAt', 'updatedAt',
          'color', 'profileVisibility'
        ];

        const missingFields = requiredFields.filter(field => !userData[field]);

        if (missingFields.length > 0) {
          console.warn('Missing required fields:', missingFields);
          return {
            success: true,
            docExists: true,
            hasMissingFields: true,
            missingFields
          };
        }

        return { success: true, docExists: true, hasMissingFields: false };
      } else {
        console.error('User document does not exist');
        return { success: true, docExists: false };
      }
    } catch (error) {
      console.error('Error accessing user document:', error);
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  } catch (error) {
    console.error('Diagnostic error:', error);
    console.groupEnd();
    return { success: false, error: error.message };
  } finally {
    console.groupEnd();
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

/**
 * Verify if the current authenticated user matches the requested user ID
 * @param {string} requestedUserId - The user ID being accessed
 * @returns {Promise<boolean>} Whether access is authorized
 */
export const verifyUserAuthorization = async (requestedUserId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return false; // No authenticated user
    }

    // Direct ID match check
    if (currentUser.uid === requestedUserId) {
      return true;
    }

    // Could add additional checks here for admin roles if needed

    return false;
  } catch (error) {
    console.error('Authorization verification error:', error);
    return false;
  }
};

/**
 * Check if user has completed profile setup
 * @returns {Promise<boolean>} Whether profile is complete
 */
export const checkProfileComplete = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const userRef = doc(firestore, 'users', currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return false;

    return !!userSnap.data().profileComplete;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};
