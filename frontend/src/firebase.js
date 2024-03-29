// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "sdp-project-2cbc4.firebaseapp.com",
    projectId: "sdp-project-2cbc4",
    storageBucket: "sdp-project-2cbc4.appspot.com",
    messagingSenderId: "918254195819",
    appId: "1:918254195819:web:a044474a380b6022384d2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);