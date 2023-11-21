

import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAT4OdxqbdatQmQpEs2gY1iNzusMwYGs0",
  authDomain: "sulmix-2bcad.firebaseapp.com",
  projectId: "sulmix-2bcad",
  storageBucket: "sulmix-2bcad.appspot.com",
  messagingSenderId: "274701854523",
  appId: "1:274701854523:web:e932d8c7cfb27ae21b791e"
};

// Initialize Firebase


 export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const firestore = getFirestore(app);
   