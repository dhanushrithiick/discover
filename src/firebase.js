// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, collection, onSnapshot, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdIjoYeprqUh3AIq4B5zhsaBZfmBuCK2Y",
  authDomain: "discover-9a6d2.firebaseapp.com",
  projectId: "discover-9a6d2",
  storageBucket: "discover-9a6d2.firebasestorage.app",
  messagingSenderId: "475402556951",
  appId: "1:475402556951:web:83a6e328f8695e6a7a6e52",
  measurementId: "G-0VBK0RN5HP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Export Firestore helpers
export { doc, updateDoc, collection, onSnapshot, getDocs };
