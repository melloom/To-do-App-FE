// Export all Supabase modules
import { supabase } from './supabase';
import * as auth from './auth';
import * as database from './database';
import * as storage from './storage';
import * as tasks from './tasks';

export {
  supabase,
  auth,
  database,
  storage,
  tasks
};

// Also export all auth functions directly for backward compatibility
export const {
  registerWithEmail,
  signInWithEmail,
  checkEmailExists,
  checkUsernameExists,
  updateUserProfile,
  signOut,
  resetPassword
} = auth;

// Export database functions for backward compatibility
export const {
  getUserData,
  createUserProfile,
  updateUserData,
  checkEmailExists: dbCheckEmailExists,
  checkUsernameExists: dbCheckUsernameExists
} = database;

// Export task functions for backward compatibility
export const {
  fetchUserTasks,
  createTask,
  updateTaskData,
  removeTask,
  toggleTaskCompletion,
  batchCreateTasks,
  getTasksByPriority,
  getCompletedTasks
} = tasks;
