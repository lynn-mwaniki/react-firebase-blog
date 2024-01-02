
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCnRYJAJChc7oHAZF5Yqhm0VZML7KgI9Rw",
  authDomain: "fir-blog-bf94f.firebaseapp.com",
  projectId: "fir-blog-bf94f",
  storageBucket: "fir-blog-bf94f.appspot.com",
  messagingSenderId: "796428558934",
  appId: "1:796428558934:web:ae810f4dac995b30e8d1f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);