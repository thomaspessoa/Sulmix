
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDUgVadkoqjjg2ZIlQSXU5k4AU7L2RcIys",
    authDomain: "sulmix-motorista.firebaseapp.com",
    projectId: "sulmix-motorista",
    storageBucket: "sulmix-motorista.appspot.com",
    messagingSenderId: "55022693893",
    appId: "1:55022693893:web:12a298c3cddde41cdff66c",
    measurementId: "G-8EW6TT39H8"
  };
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);