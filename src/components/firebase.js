// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1IYiRePL3NsTDLO5VW51lMjhiOF02zQ",
  authDomain: "eshopper-a7464.firebaseapp.com",
  databaseURL: "https://eshopper-a7464-default-rtdb.firebaseio.com",
  projectId: "eshopper-a7464",
  storageBucket: "eshopper-a7464.appspot.com",
  messagingSenderId: "837464046078",
  appId: "1:837464046078:web:b1b003f20fe7e32c6b28af",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Database
const firebaseDatabase = getDatabase(firebaseApp);

// Export Firebase app and database
export { firebaseApp, firebaseDatabase };