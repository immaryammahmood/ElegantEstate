// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA6VC1u2ltgV7sJtfmkWUEBQxw1vGn4PI",
  authDomain: "realestate-4d72d.firebaseapp.com",
  projectId: "realestate-4d72d",
  storageBucket: "realestate-4d72d.appspot.com",
  messagingSenderId: "396209973978",
  appId: "1:396209973978:web:8d0c5d9a7947b88cf6d3e3",
  measurementId: "G-1E41HX35L8"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);