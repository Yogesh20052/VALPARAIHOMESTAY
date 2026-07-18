// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUyzpt5ZWeBYYRmsiDBw6S222FtKtspSM",
  authDomain: "valparai-homestay-380ee.firebaseapp.com",
  projectId: "valparai-homestay-380ee",
  storageBucket: "valparai-homestay-380ee.firebasestorage.app",
  messagingSenderId: "867688031814",
  appId: "1:867688031814:web:c7538d0b4074f455a88c47",
  measurementId: "G-9NHRYS5DLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore
export { db };