// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMg4o6grRK9ZxoWHdUPe2Ga7nKt-Yxq7c",
  authDomain: "first-firebase-73ad0.firebaseapp.com",
  projectId: "first-firebase-73ad0",
  storageBucket: "first-firebase-73ad0.firebasestorage.app",
  messagingSenderId: "59758700381",
  appId: "1:59758700381:web:81baceccb3031c9d2eeab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMg4o6grRK9ZxoWHdUPe2Ga7nKt-Yxq7c",
  authDomain: "first-firebase-73ad0.firebaseapp.com",
  projectId: "first-firebase-73ad0",
  storageBucket: "first-firebase-73ad0.firebasestorage.app",
  messagingSenderId: "59758700381",
  appId: "1:59758700381:web:81baceccb3031c9d2eeab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/