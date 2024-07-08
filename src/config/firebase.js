// src/config/firebaseConfig.js

// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "55d00ccc5078575279a1884c5ef5d7865e462662", // Use your actual API key here
  authDomain: "mern-stack-7d963.firebaseapp.com", // Constructed from project ID
  projectId: "mern-stack-7d963",
  storageBucket: "mern-stack-7d963.appspot.com",
  messagingSenderId: "105862456370708056956",
  appId: "1:105862456370708056956:web:e118e2526a0f439de7be9b", // Ensure to use your specific Firebase app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
