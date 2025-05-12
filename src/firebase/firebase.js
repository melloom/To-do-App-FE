import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu0zh_z4DSdWIvO-jMtGy0NXUrwwvbEfw",
  authDomain: "tasklio-b8336.firebaseapp.com",
  projectId: "tasklio-b8336",
  storageBucket: "tasklio-b8336.firebasestorage.app",
  messagingSenderId: "438026561395",
  appId: "1:438026561395:web:d4827a6c58768a4c39c706",
  measurementId: "G-9W6DZXE5ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, storage, analytics };
export default app;
