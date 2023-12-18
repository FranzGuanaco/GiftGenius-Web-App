// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHok5-TGr29SRV8TQgb8-w2Ssf_qzxpYQ",
  authDomain: "gift-genius-c1f18.firebaseapp.com",
  projectId: "gift-genius-c1f18",
  storageBucket: "gift-genius-c1f18.appspot.com",
  messagingSenderId: "657434421820",
  appId: "1:657434421820:web:ad86aefe086b0aa5abf139",
  measurementId: "G-B7PZRJ52B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth  };