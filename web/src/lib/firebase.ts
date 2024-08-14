import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA-pNoXvuv3CY7wP77l5vhWx-uhVOm9EMY",
    authDomain: "study-assistant-2bf95.firebaseapp.com",
    databaseURL: "https://study-assistant-2bf95-default-rtdb.firebaseio.com",
    projectId: "study-assistant-2bf95",
    storageBucket: "study-assistant-2bf95.appspot.com",
    messagingSenderId: "653540759289",
    appId: "1:653540759289:web:db616a1ddd767e185bb428"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };