// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMIAN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_BUCKET_ID),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth , app , db}