// Import required functions from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3XfvKWE-vDMC8syz-iAkDjEhaYezY0qk",
  authDomain: "album-b867d.firebaseapp.com",
  databaseURL: "https://album-b867d-default-rtdb.firebaseio.com",
  projectId: "album-b867d",
  storageBucket: "album-b867d.appspot.com",
  messagingSenderId: "504548730779",
  appId: "1:504548730779:web:3ed751921b3a4b88c5233e"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get references to Firebase services
const storage = getStorage(app);
const database = getDatabase(app);

// Export the initialized Firebase app and the services
export { app, storage, database };