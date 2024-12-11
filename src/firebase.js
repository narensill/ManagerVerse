// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWfIpJ1hTQiEj0b-AAgn_BLPgA6vQOtiU",
  authDomain: "manager-verse.firebaseapp.com",
  projectId: "manager-verse",
  storageBucket: "manager-verse.firebasestorage.app",
  messagingSenderId: "33127795586",
  appId: "1:33127795586:web:bc7617e29b5309b7c45d9b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default db; // Default export
export { auth };   // Named export
