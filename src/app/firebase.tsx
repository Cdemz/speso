// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuktQ_Rz5vPfc9Gvtx59M84jQ9HpUx9Rs",
  authDomain: "speso1.firebaseapp.com",
  projectId: "speso1",
  storageBucket: "speso1.appspot.com",
  messagingSenderId: "422850924482",
  appId: "1:422850924482:web:2c820f9f7a025b1ddf905b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
