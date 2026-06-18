import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkTuo3dKNl5pInQKrF0Wq2Woj3maYXYNc",
  authDomain: "contact-us-c2689.firebaseapp.com",
  projectId: "contact-us-c2689",
  storageBucket: "contact-us-c2689.firebasestorage.app",
  messagingSenderId: "689480269318",
  appId: "1:689480269318:web:bc3a04cfe22ba9099f0d87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Contact Form Elements
const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Details Form Elements
const detailsName = document.getElementById("details-name");
const detailsEmail = document.getElementById("details-email");
const detailsMessage = document.getElementById("details-message");

// Buttons
const editBtn = document.querySelector(".edit-btn");
const updateBtn = document.querySelector(".update-btn");

// Database Reference
const contactRef = ref(db, "contactUs/user1");

/* ==========================
   SUBMIT BUTTON
========================== */
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contactData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  try {
    await set(contactRef, contactData);

    // Show values in User Details form
    detailsName.value = contactData.name;
    detailsEmail.value = contactData.email;
    detailsMessage.value = contactData.message;

    // Clear Contact Form
    contactForm.reset();

    alert("Data Saved Successfully!");
  } catch (error) {
    console.error(error);
  }
});

/* ==========================
   EDIT BUTTON
========================== */
editBtn.addEventListener("click", async () => {
  try {
    const snapshot = await get(contactRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Fill Contact Form with existing values
      nameInput.value = data.name;
      emailInput.value = data.email;
      messageInput.value = data.message;
    }
  } catch (error) {
    console.error(error);
  }
});

/* ==========================
   UPDATE BUTTON
========================== */
updateBtn.addEventListener("click", async () => {
  const updatedData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  try {
    await update(contactRef, updatedData);

    // Update User Details Form
    detailsName.value = updatedData.name;
    detailsEmail.value = updatedData.email;
    detailsMessage.value = updatedData.message;

    // Clear Contact Form
    contactForm.reset();

    alert("Data Updated Successfully!");
  } catch (error) {
    console.error(error);
  }
});

