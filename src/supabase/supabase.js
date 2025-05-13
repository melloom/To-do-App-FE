import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://qirkjqsaxnxonfqitupo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcmtqcXNheG54b25mcWl0dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjg3MzYsImV4cCI6MjA2Mjc0NDczNn0.F3-qjNBHTvCvE0p8yeOLOdy5s6wwevtpNCEYbXIPixg';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Helper function to get authenticated user
 * Returns the authenticated user or throws an error if no user is found
 */
export const getAuthenticatedUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  if (!data?.user) {
    throw new Error('No authenticated user found. Please sign in again.');
  }

  return data.user;
};

/**
 * Check if a user's email is confirmed
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} - Whether the email is confirmed
 */
export const isEmailConfirmed = async (userId) => {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) throw error;

    return !!data?.user?.email_confirmed_at || !!data?.user?.confirmed_at;
  } catch (error) {
    console.error("Error checking email confirmation status:", error);
    return false;
  }
};

/**
 * Check if a user has a pending verification
 * @returns {object|null} - Verification data or null
 */
export const getPendingVerification = () => {
  try {
    const pendingData = localStorage.getItem('pendingVerification');
    if (!pendingData) return null;

    const verification = JSON.parse(pendingData);
    const timestamp = new Date(verification.timestamp);
    const now = new Date();
    const hoursDiff = (now - timestamp) / (1000 * 60 * 60);

    // Valid for 24 hours
    if (hoursDiff < 24) {
      return verification;
    } else {
      localStorage.removeItem('pendingVerification');
      return null;
    }
  } catch (error) {
    console.error("Error parsing pending verification:", error);
    localStorage.removeItem('pendingVerification');
    return null;
  }
};

export { supabase };
export default supabase;
