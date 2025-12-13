// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj7MC7AGF5G7-4fTahgGc9RxvZUXFzNkU",
  authDomain: "ticket-bari.firebaseapp.com",
  projectId: "ticket-bari",
  storageBucket: "ticket-bari.firebasestorage.app",
  messagingSenderId: "48671534902",
  appId: "1:48671534902:web:b5e2aee3fefb5a40ae0d97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;