import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-pNoXvuv3CY7wP77l5vhWx-uhVOm9EMY",
    authDomain: "study-assistant-2bf95.firebaseapp.com",
    projectId: "study-assistant-2bf95",
    storageBucket: "study-assistant-2bf95.appspot.com",
    messagingSenderId: "653540759289",
    appId: "1:653540759289:web:db616a1ddd767e185bb428"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };