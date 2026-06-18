
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBkLHn7XRVyGv5osDAU3NweL3uY8aK1cgc",
    authDomain: "mobile-program-8e1cf.firebaseapp.com",
    projectId: "mobile-program-8e1cf",
    storageBucket: "mobile-program-8e1cf.firebasestorage.app",
    messagingSenderId: "782712661898",
    appId: "1:782712661898:web:66b0a40dd86d36de264a73"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)

  console.log(db)
