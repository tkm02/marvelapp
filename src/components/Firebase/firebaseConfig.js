import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export {auth}





