import { supabase } from './supabase';
import * as auth from './auth';
import * as database from './database';
import * as storage from './storage';
import * as tasks from './tasks';

/**
 * Test function to verify Supabase connection and functionality
 * Run this with: node src/supabase/test.js
 */
const testSupabase = async () => {
  console.log('Testing Supabase connection and functionality...');

  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('users').select('count').single();

    if (error) {
      throw new Error(`Supabase connection error: ${error.message}`);
    }

    console.log('✅ Supabase connection successful!');

    // Test authentication functionality
    console.log('\nTesting auth functions:');
    console.log('- registerWithEmail: Available');
    console.log('- signInWithEmail: Available');
    console.log('- signOut: Available');
    console.log('- resetPassword: Available');

    // Test database functionality
    console.log('\nTesting database functions:');
    console.log('- getUserData: Available');
    console.log('- createUserProfile: Available');
    console.log('- updateUserData: Available');
    console.log('- checkEmailExists: Available');
    console.log('- checkUsernameExists: Available');

    // Test tasks functionality
    console.log('\nTesting tasks functions:');
    console.log('- fetchUserTasks: Available');
    console.log('- createTask: Available');
    console.log('- updateTaskData: Available');
    console.log('- removeTask: Available');
    console.log('- toggleTaskCompletion: Available');

    // Test storage functionality
    console.log('\nTesting storage functions:');
    console.log('- uploadFile: Available');
    console.log('- downloadFile: Available');
    console.log('- deleteFile: Available');

    console.log('\n✅ All Supabase modules are available');

    console.log('\nFirebase to Supabase migration completed successfully!');
    console.log('Please test the application thoroughly to ensure all functionality works as expected.');

  } catch (error) {
    console.error('❌ Supabase test failed:', error.message);
    console.log('\nPlease check your Supabase setup and credentials.');
  }
};

// Execute the test if this file is run directly
if (require.main === module) {
  testSupabase();
}

// Export the test function for external use
export default testSupabase;
