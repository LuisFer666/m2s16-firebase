// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoTa30xCZ28fGIjVVsf7H_LW_OqQDfhw4",
  authDomain: "form-restaurant-ejemplo.firebaseapp.com",
  projectId: "form-restaurant-ejemplo",
  storageBucket: "form-restaurant-ejemplo.appspot.com",
  messagingSenderId: "568106258543",
  appId: "1:568106258543:web:98bafc1ed68b750115fd9a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();