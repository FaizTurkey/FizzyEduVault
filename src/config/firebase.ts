// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSlL0M1Qb57FI28lksiYatYk_A9tcGD4w",
  authDomain: "fizzyeducation.firebaseapp.com",
  projectId: "fizzyeducation",
  storageBucket: "fizzyeducation.firebasestorage.app",
  messagingSenderId: "84092660290",
  appId: "1:84092660290:web:b6abba392b084a0460dbdb",
  measurementId: "G-PX1CQH6SKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();