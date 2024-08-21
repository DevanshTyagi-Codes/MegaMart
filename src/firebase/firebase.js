// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
  authDomain: "contactapp-f4a75.firebaseapp.com",
  projectId: "contactapp-f4a75",
  storageBucket: "contactapp-f4a75.appspot.com",
  messagingSenderId: "713077458353",
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth , app , db}