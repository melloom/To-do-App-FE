// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export initialized Firebase services
export { app, analytics, auth, db, storage };
export default app;
