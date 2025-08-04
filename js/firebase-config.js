
// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8zvv9hnqciT6pic_nCsxTf0EeEOb_cEo",
  authDomain: "password-manager316.firebaseapp.com",
  projectId: "password-manager316",
  storageBucket: "password-manager316.firebasestorage.app",
  messagingSenderId: "1099004059457",
  appId: "1:1099004059457:web:0b5321450513e4110b0bc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
