import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyACMrhorxUnZDLC5rEYzMyXTdAnSYK1i5Y",
    authDomain: "login-signup-6436c.firebaseapp.com",
    projectId: "login-signup-6436c",
    storageBucket: "login-signup-6436c.firebasestorage.app",
    messagingSenderId: "963487487185",
    appId: "1:963487487185:web:0608b74568a3e84ef8a1f0"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider,provider }