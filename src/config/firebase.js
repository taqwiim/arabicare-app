// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcO5nopatzIRQP-tooxIpod4MC0zq58-E",
  authDomain: "iot-ta-1a4c2.firebaseapp.com",
  projectId: "iot-ta-1a4c2",
  storageBucket: "iot-ta-1a4c2.appspot.com",
  messagingSenderId: "478773584342",
  appId: "1:478773584342:web:9038fb5fcfffc1851c8477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);