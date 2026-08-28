// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2OqK0MQQTUn8IHtwSfggon2daauhLUUo",
  authDomain: "lenskincarestore.firebaseapp.com",
  projectId: "lenskincarestore",
  storageBucket: "lenskincarestore.firebasestorage.app",
  messagingSenderId: "951957920370",
  appId: "1:951957920370:web:43d27daed1ecafd1ed80eb",
  measurementId: "G-57P6B5TMVC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
