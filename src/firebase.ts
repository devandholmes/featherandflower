import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; // <-- Import the storage module

// Initialize Firestore
const firebaseConfig = {
    apiKey: "AIzaSyATyJqzs7Pd_lUyJNF3C1Z8udbGUxSirdw",
    authDomain: "featherandflower-e8e7f.firebaseapp.com",
    projectId: "featherandflower-e8e7f",
    storageBucket: "featherandflower-e8e7f.appspot.com",
    messagingSenderId: "987442319179",
    appId: "1:987442319179:web:dac2349bcf6c476894e2ce",
    measurementId: "G-65VQJE4T4P"
};

firebase.initializeApp(firebaseConfig);

// auth
export const auth = firebase.auth();

// Initialize Firestore
export const db = firebase.firestore();

// Initialize Firebase Storage
export const storage = firebase.storage(); // <-- Initialize storage here
