import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";  



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkqT4gDhCqqHyhsFfJudXKUJsiJPV_iCg",
  authDomain: "stegapp-5140a.firebaseapp.com",
  projectId: "stegapp-5140a",
  storageBucket: "stegapp-5140a.firebasestorage.app",
  messagingSenderId: "422775793203",
  appId: "1:422775793203:web:b748f062767f50ad362546"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };  
