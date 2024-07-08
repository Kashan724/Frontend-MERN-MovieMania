// src/config/firebaseConfig.js

import firebase from 'firebase/app';
import 'firebase/storage'; // Import only the necessary Firebase services

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "mern-stack-7d963",
  storageBucket: "mern-stack-7d963.appspot.com",
  messagingSenderId: "105862456370708056956",
  appId: "1:105862456370708056956:web:e118e2526a0f439de7be9d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };

