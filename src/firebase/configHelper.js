// Helper functions for Firebase configuration

/**
 * Instructions for configuring Firebase Auth domains
 * @returns {string} Instructions text
 */
export const getFirebaseAuthDomainInstructions = () => {
  return `
To fix the "Firebase: Error (auth/unauthorized-domain)" issue:

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: "tasklio-b8336"
3. Go to Authentication > Settings > Authorized domains
4. Add these domains to the list:
   - localhost
   - 127.0.0.1
   - Any other domains you're using for development or production

This error occurs because Firebase restricts sign-in to authorized domains for security reasons.
  `;
};

/**
 * Get current domain for debugging
 * @returns {string} Current domain name
 */
export const getCurrentDomain = () => {
  return window.location.hostname;
};

/**
 * Check if current domain is authorized for Firebase Auth
 * @returns {boolean} True if domain is localhost or 127.0.0.1 (usually pre-authorized)
 */
export const isAuthorizedDomain = () => {
  const domain = getCurrentDomain();
  return domain === 'localhost' || domain === '127.0.0.1';
};
