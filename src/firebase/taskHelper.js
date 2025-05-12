import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Creates a new task with proper structure according to security rules
 * @param {Object} taskData - Task data
 * @param {string} userId - The user ID who owns this task
 * @returns {Promise<Object>} The created task with ID
 */
export const createTask = async (taskData, userId) => {
  if (!userId) {
    throw new Error('User ID is required to create a task');
  }

  if (!taskData.title || typeof taskData.title !== 'string' || !taskData.title.trim()) {
    throw new Error('Task title is required and must be a non-empty string');
  }

  try {
    // Ensure task has required fields
    const formattedTask = {
      userId: userId,
      title: taskData.title.trim(),
      description: taskData.description || '',
      completed: taskData.completed || false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      tags: taskData.tags || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const taskRef = await addDoc(collection(firestore, 'tasks'), formattedTask);

    return {
      id: taskRef.id,
      ...formattedTask
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Batch create multiple tasks for a user
 * @param {Array<Object>} tasks - Array of task data objects
 * @param {string} userId - The user ID who owns these tasks
 * @returns {Promise<Array<Object>>} The created tasks with IDs
 */
export const batchCreateTasks = async (tasks, userId) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('Tasks must be a non-empty array');
  }

  try {
    const createdTasks = [];

    for (const task of tasks) {
      const newTask = await createTask(task, userId);
      createdTasks.push(newTask);
    }

    return createdTasks;
  } catch (error) {
    console.error('Error batch creating tasks:', error);
    throw error;
  }
};

export default {
  createTask,
  batchCreateTasks
};
