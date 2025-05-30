 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBkEW0B3IWItEwzcKRwEBAMJEWq9afka3k",
    authDomain: "authentication-1682e.firebaseapp.com",
    projectId: "authentication-1682e",
    storageBucket: "authentication-1682e.firebasestorage.app",
    messagingSenderId: "127269483678",
    appId: "1:127269483678:web:9c27ad9f3005b71d41f78f",
    measurementId: "G-G2PL249YJY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
