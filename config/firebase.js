
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAysypWkWU6Q_F1Du9if_NMeYj9zEaJNUo",
  authDomain: "comet-21c2f.firebaseapp.com",
  projectId: "comet-21c2f",
  storageBucket: "comet-21c2f.appspot.com",
  messagingSenderId: "574140495483",
  appId: "1:574140495483:web:afd7d906775129f9c4d4de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Auth instance
export const auth = getAuth(app);
//Database instance
export const db = getFirestore(app);
//storage instance
export const storage = getStorage(app);