import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu0zh_z4DSdWIvO-jMtGy0NXUrwwvbEfw",
  authDomain: "tasklio-b8336.firebaseapp.com",
  projectId: "tasklio-b8336",
  storageBucket: "tasklio-b8336.appspot.com", // Fixed storage bucket URL
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

// Handle CORS for local development
if (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('gitpod.io') ||
    window.location.hostname.includes('codespaces')) {
  console.log('Running in development environment - setting persistence to memory');
  // Import needed for this configuration
  import('firebase/firestore').then(({ enableMultiTabIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED }) => {
    try {
      // Use memory-only persistence for development to avoid CORS issues
      initializeFirestore(app, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        experimentalForceLongPolling: true, // Use long polling instead of WebSockets
      });
    } catch (error) {
      console.error("Firestore initialization error:", error);
    }
  });
}

// Initialize analytics only in browser environments and if supported
let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(err => {
  console.error("Analytics initialization error:", err);
});

// Use emulators for local development if needed
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { app, auth, firestore, storage, analytics };
export default app;
