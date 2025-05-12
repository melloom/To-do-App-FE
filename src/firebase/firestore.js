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
    throw error;
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
    throw error;
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
    throw error;
  }
};

// Add a task
export const addTask = async (taskData) => {
  try {
    const taskRef = await addDoc(collection(firestore, 'tasks'), {
      ...taskData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { id: taskRef.id, ...taskData };
  } catch (error) {
    throw error;
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
