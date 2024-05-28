// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF5ecafY5XDYY6Zk893OBZBW5vvw3k8Rs",
  authDomain: "testing-9e477.firebaseapp.com",
  databaseURL: "https://testing-9e477-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-9e477",
  storageBucket: "testing-9e477.appspot.com",
  messagingSenderId: "667401033125",
  appId: "1:667401033125:web:5462975f3a555c03fec44c",
  measurementId: "G-4TY4GV698Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};