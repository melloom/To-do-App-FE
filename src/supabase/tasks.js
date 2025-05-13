import { supabase } from './supabase';
import { getUserTasks, addTask, updateTask, deleteTask } from './database';

/**
 * Get all tasks for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of tasks
 */
export const fetchUserTasks = async (userId) => {
  try {
    return await getUserTasks(userId);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Promise<Object>} - The created task
 */
export const createTask = async (taskData) => {
  try {
    return await addTask(taskData);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

/**
 * Batch create multiple tasks for a user
 * @param {Array<Object>} tasks - Array of task data objects
 * @param {string} userId - The user ID who owns these tasks
 * @returns {Promise<Array<Object>>} - The created tasks with IDs
 */
export const batchCreateTasks = async (tasks, userId) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('Tasks must be a non-empty array');
  }

  try {
    const createdTasks = [];

    for (const task of tasks) {
      // Add userId to each task if not already present
      const taskWithUserId = { ...task, userId: task.userId || userId };
      const newTask = await createTask(taskWithUserId);
      createdTasks.push(newTask);
    }

    return createdTasks;
  } catch (error) {
    console.error('Error batch creating tasks:', error);
    throw error;
  }
};

/**
 * Update a task
 * @param {string} taskId - The task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - The updated task
 */
export const updateTaskData = async (taskId, taskData) => {
  try {
    return await updateTask(taskId, taskData);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

/**
 * Delete a task
 * @param {string} taskId - The task ID
 * @returns {Promise<boolean>} - True if successful
 */
export const removeTask = async (taskId) => {
  try {
    return await deleteTask(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

/**
 * Toggle task completion status
 * @param {string} taskId - The task ID
 * @param {boolean} currentStatus - Current completion status
 * @returns {Promise<Object>} - The updated task
 */
export const toggleTaskCompletion = async (taskId, currentStatus) => {
  try {
    return await updateTask(taskId, { completed: !currentStatus });
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

/**
 * Get tasks by priority
 * @param {string} userId - The user ID
 * @param {string} priority - Priority value ('high', 'medium', 'low')
 * @returns {Promise<Array>} - Array of tasks with the specified priority
 */
export const getTasksByPriority = async (userId, priority) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('priority', priority)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Convert snake_case to camelCase for frontend
    return data.map(task => {
      return Object.entries(task).reduce((acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[camelKey] = value;
        return acc;
      }, {});
    });
  } catch (error) {
    console.error(`Error getting ${priority} priority tasks:`, error);
    throw error;
  }
};

/**
 * Get completed tasks
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of completed tasks
 */
export const getCompletedTasks = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('completed', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    // Convert snake_case to camelCase for frontend
    return data.map(task => {
      return Object.entries(task).reduce((acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[camelKey] = value;
        return acc;
      }, {});
    });
  } catch (error) {
    console.error("Error getting completed tasks:", error);
    throw error;
  }
};
