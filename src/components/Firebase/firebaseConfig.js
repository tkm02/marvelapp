import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, doc} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDF7QmtSyqBHq-RMVwO4kshyMEkMxNa5Os",
    authDomain: "marvel-quiz-7d5c9.firebaseapp.com",
    projectId: "marvel-quiz-7d5c9",
    storageBucket: "marvel-quiz-7d5c9.appspot.com",
    messagingSenderId: "609119722590",
    appId: "1:609119722590:web:d430c71a8f6ac2198568cf"
  };

const app = initializeApp(config);
const auth = getAuth(app); 

const db = getFirestore(app)

// const user = (uid) => collection(db,`users/${uid}`);
const user = (uid) => doc(db,`users/${uid}`);



export {auth, db, user}





