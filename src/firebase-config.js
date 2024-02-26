// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAM3f6VlhuuSmHPuSQdZJfbAWkhk-Q7pi0",
  authDomain: "chatapp-b86d2.firebaseapp.com",
  projectId: "chatapp-b86d2",
  storageBucket: "chatapp-b86d2.appspot.com",
  messagingSenderId: "104678465351",
  appId: "1:104678465351:web:fc55b49720390793c57662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);