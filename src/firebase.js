import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkG_MqTeyg2vd6hkzqEw1wiYgcHKXRtEk",
  authDomain: "e-clone-cv.firebaseapp.com",
  projectId: "e-clone-cv",
  storageBucket: "e-clone-cv.appspot.com",
  messagingSenderId: "190582054140",
  appId: "1:190582054140:web:5a55aa78ef6c8455e68b79",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
