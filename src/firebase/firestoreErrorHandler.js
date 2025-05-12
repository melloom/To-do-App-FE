/**
 * Firestore Error Handler
 * Provides utility functions to handle common Firestore errors
 */

// Timeout for Firestore operations (in milliseconds)
const FIRESTORE_TIMEOUT = 15000;

/**
 * Execute a Firestore operation with timeout and error handling
 * @param {Function} operation - The Firestore operation to execute
 * @param {string} operationName - Name of the operation for logging
 * @returns {Promise} - Result of the operation
 */
export const executeWithTimeout = async (operation, operationName = 'Firestore operation') => {
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${operationName} timed out after ${FIRESTORE_TIMEOUT}ms`));
      }, FIRESTORE_TIMEOUT);
    });

    // Race the operation against the timeout
    return await Promise.race([operation(), timeoutPromise]);
  } catch (error) {
    console.error(`Error in ${operationName}:`, error);

    // Handle specific Firestore errors
    if (error.code === 'permission-denied') {
      console.error('Firestore permission denied. Check security rules.');
      error.message = 'You do not have permission to perform this operation.';
    } else if (error.code === 'unavailable') {
      console.error('Firestore is currently unavailable. Check your connection.');
      error.message = 'The service is currently unavailable. Please check your connection and try again.';
    } else if (error.code === 'unauthenticated') {
      console.error('Authentication required for Firestore operation.');
      error.message = 'Authentication is required for this operation.';
    }

    throw error;
  }
};

/**
 * Retry a Firestore operation with exponential backoff
 * @param {Function} operation - The operation to retry
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise} - Result of the operation
 */
export const retryOperation = async (operation, maxRetries = 3) => {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed:`, error.message);
      lastError = error;

      // Skip retry for certain errors
      if (
        error.code === 'permission-denied' ||
        error.code === 'unauthenticated'
      ) {
        break;
      }

      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

export default {
  executeWithTimeout,
  retryOperation
};
