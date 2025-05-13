import { supabase } from './supabase';
import { createUserProfile, checkEmailExists as dbCheckEmailExists, checkUsernameExists as dbCheckUsernameExists } from './database';

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email, password, userData) => {
  try {
    console.log('Starting email registration', email);

    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          // Add minimal user metadata in the auth profile
          first_name: userData.firstName,
          last_name: userData.lastName,
          full_name: `${userData.firstName} ${userData.lastName}`.trim(),
        }
      }
    });

    if (authError) throw authError;
    console.log('Auth registration successful', authData);

    if (authData?.user) {
      // Create the user profile in our users table
      const { id: userId } = authData.user;

      // Convert camelCase to snake_case
      const dbUserData = Object.entries(userData).reduce((acc, [key, value]) => {
        // Skip undefined values
        if (value === undefined) return acc;

        // Convert camelCase keys to snake_case
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        acc[snakeKey] = value;
        return acc;
      }, {});

      // Check if email confirmation is required
      const isEmailConfirmed = authData.user.email_confirmed_at || authData.user.confirmed_at;
      const needsEmailConfirmation = authData.session === null && !isEmailConfirmed;

      // Add user ID and additional fields
      const userProfile = {
        id: userId,
        email: email,
        email_confirmed: isEmailConfirmed || false,
        email_verification_sent: needsEmailConfirmation || false,
        created_at: new Date().toISOString(),
        ...dbUserData
      };

      // Log verification status for debugging
      console.log('User verification status:', {
        isEmailConfirmed,
        needsEmailConfirmation,
        hasSession: !!authData.session
      });

      try {
        // Use the unconfirmed user flag for users who need to verify their email
        // This helps bypass RLS policies that depend on auth.uid()
        const profileData = await createUserProfile(userId, userProfile, needsEmailConfirmation);
        console.log('User profile created', profileData);
      } catch (profileError) {
        console.error("Error creating user profile:", profileError);
        // Even if profile creation fails, we should return the auth user
        // so they can try to complete their profile later
      }

      return {
        success: true,
        user: {
          id: userId,
          email: email,
          emailConfirmed: isEmailConfirmed,
          needsEmailConfirmation,
          ...userData
        }
      };
    } else {
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error with Google sign-in:", error.message);
    throw error;
  }
};

/**
 * Complete Google Registration by updating user profile data
 */
export const completeGoogleRegistration = async (userData) => {
  try {
    // Get the current user session
    const { data: user, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
      console.error("Session error:", sessionError);
      throw new Error('Authentication error. Please sign in again.');
    }

    if (!user?.user) {
      // Try to get session from localStorage as a fallback
      const session = JSON.parse(localStorage.getItem('supabase.auth.token'));
      if (session?.currentSession?.user) {
        user.user = session.currentSession.user;
      } else {
        throw new Error('No authenticated user found. Please sign in again.');
      }
    }

    const userId = user.user.id;

    // Check if user already exists in the users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    // Format user data
    const formattedUserData = {
      id: userId,
      email: user.user.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      full_name: `${userData.firstName} ${userData.lastName}`.trim(),
      username: userData.username,
      referral_source: userData.referralSource || 'Not specified',
      usage_purpose: userData.usagePurpose || 'Not specified',
      referral_code: userData.referralCode || '',
      bio: userData.bio || '',
      profile_visibility: userData.profileVisibility || 'public',
      color: userData.color || '#5b5ef4',
      icon: userData.icon || '👤',
      updated_at: new Date().toISOString(),
      registration_complete: true
    };

    let result;

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update(formattedUserData)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new user
      formattedUserData.created_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('users')
        .insert([formattedUserData])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return result;
  } catch (error) {
    console.error("Error completing Google registration:", error.message);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  try {
    // Only update auth metadata, not the full profile
    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        full_name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username,
        avatar_url: userData.avatarUrl,
      }
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Auth profile update error:", error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

/**
 * Check if email exists
 */
export const checkEmailExists = async (email) => {
  return dbCheckEmailExists(email);
};

/**
 * Check if username exists
 */
export const checkUsernameExists = async (username) => {
  return dbCheckUsernameExists(username);
};

/**
 * Observer for auth state changes
 */
export const observeAuthState = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};

/**
 * Update registration step
 */
export const updateRegistrationStep = async (userId, step) => {
  try {
    // First check if the current authenticated user matches the userId
    const { data: authUser } = await supabase.auth.getUser();

    if (!authUser?.user) {
      throw new Error('No authenticated user found');
    }

    if (authUser.user.id !== userId) {
      throw new Error('Cannot update a different user\'s profile due to RLS restrictions');
    }

    const { error } = await supabase
      .from('users')
      .update({
        registration_step: step,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error updating registration step:", error);
    throw error;
  }
};
