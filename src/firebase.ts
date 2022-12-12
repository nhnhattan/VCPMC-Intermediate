// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCsxkzxAj_3kjnBX_-R5kNXOMSXkX_xgsI",
  authDomain: "vcpmc-674bd.firebaseapp.com",
  databaseURL: "https://vcpmc-674bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vcpmc-674bd",
  storageBucket: "vcpmc-674bd.appspot.com",
  messagingSenderId: "1050131770797",
  appId: "1:1050131770797:web:c16574f85769b397d90524"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export { app, db, storage };
