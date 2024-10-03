import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "emotion-detector-95a5c.firebaseapp.com",
    projectId: "emotion-detector-95a5c",
    storageBucket: "emotion-detector-95a5c.appspot.com",
    messagingSenderId: "780017114939",
    appId: "1:780017114939:web:f592fc9a309217ce93a11e",
    measurementId: "G-1CL7M5BH2E"
  };
  
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
