// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa2skrjAQqfj17FG4VrsF4Wh_99q0oQ8M",
  authDomain: "codefolio-369811.firebaseapp.com",
  projectId: "codefolio-369811",
  storageBucket: "codefolio-369811.appspot.com",
  messagingSenderId: "447542022584",
  appId: "1:447542022584:web:6581baf23949763c51ff4d",
  measurementId: "G-Q24EP6LGYF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
