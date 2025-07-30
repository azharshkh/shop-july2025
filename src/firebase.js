// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5DCAzRtCpuG2EVmN-xXztmLqZ32VWyLM",
  authDomain: "salman-shopping.firebaseapp.com",
  projectId: "salman-shopping",
  storageBucket: "salman-shopping.appspot.com", // fixed typo here (.app)
  messagingSenderId: "783265299299",
  appId: "1:783265299299:web:92e959b914c9a07bf47156",
  measurementId: "G-BQBQXLSW6M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
