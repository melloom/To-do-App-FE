import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { firestore } from './firebase';
import { handlePermissionError, logAuthDebugInfo } from './securityHelper';

// ===== User operations =====

// Get user data
export const getUserData = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    const handledError = handlePermissionError(error, 'fetching user data');
    throw handledError;
  }
};

// Store user data
export const storeUserData = async (userData) => {
  try {
    const userRef = doc(firestore, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    return { id: userData.uid, ...userData };
  } catch (error) {
    console.error("Error storing user data:", error);
    const handledError = handlePermissionError(error, 'storing user data');
    throw handledError;
  }
};

// Update user data
export const updateUserData = async (userId, data) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });

    // Get updated user data
    const updatedDoc = await getDoc(userRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Error updating user data:", error);
    const handledError = handlePermissionError(error, 'updating user data');
    throw handledError;
  }
};

/**
 * Creates a user profile in Firestore only when registration is fully complete
 * @param {Object} userData Complete user data
 * @returns {Promise<Object>} The created user profile
 */
export const createUserProfile = async (userData) => {
  try {
    if (!userData || !userData.uid) {
      throw new Error('Invalid user data provided');
    }

    // Remove the temporary flag before saving
    const { isTemporary, ...userDataToSave } = userData;

    // Add creation timestamp
    const userWithTimestamp = {
      ...userDataToSave,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Use setDoc with the user's UID as the document ID for consistency
    await setDoc(doc(firestore, 'users', userData.uid), userWithTimestamp);

    return userWithTimestamp;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// ===== Task operations =====

// Get user tasks
export const getUserTasks = async (userId) => {
  try {
    const tasksQuery = query(
      collection(firestore, 'tasks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(tasksQuery);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting tasks:", error);
    const handledError = handlePermissionError(error, 'fetching tasks');
    throw handledError;
  }
};

// Add a task (enhanced to match example)
export const addTask = async (taskData) => {
  try {
    // Check if taskData is provided as a structured object
    // or if we need to construct it from individual parameters
    const formattedTaskData = typeof taskData === 'object' ?
      { ...taskData } :
      { title: taskData };

    // Ensure required fields are present
    const finalTaskData = {
      title: formattedTaskData.title || "New Task",
      description: formattedTaskData.description || "",
      userId: formattedTaskData.userId,
      completed: formattedTaskData.completed !== undefined ? formattedTaskData.completed : false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Add document to Firestore
    const taskRef = await addDoc(collection(firestore, 'tasks'), finalTaskData);

    // Return the created task with its ID
    return {
      id: taskRef.id,
      ...finalTaskData,
      createdAt: new Date().toISOString() // Convert for immediate use in UI
    };
  } catch (error) {
    console.error("Error adding task:", error);
    const handledError = handlePermissionError(error, 'creating task');
    throw handledError;
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const taskRef = doc(firestore, 'tasks', taskId);
    await updateDoc(taskRef, {
      ...taskData,
      updatedAt: serverTimestamp()
    });

    return { id: taskId, ...taskData };
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(firestore, 'tasks', taskId));
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Debug authentication flow
 * @param {string} stage - Current stage in the auth flow
 * @param {object} data - Relevant data for this stage
 */
export const debugAuth = (stage, data = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    console.group(`Auth Flow: ${stage}`);
    console.log(data);
    console.groupEnd();
  }
};
