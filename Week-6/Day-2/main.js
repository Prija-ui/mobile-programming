import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from
"https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// initializeApp – to initialize your Firebase app.
// getDatabase – to get a reference to the Firebase Realtime Database.
// set – to write data to the database.
// get – to read data from the database.
// ref – to create references (paths) in the database.

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
// initializeApp(firebaseConfig) initializes your Firebase application
// using the config.
// getDatabase(app) gets the Realtime Database instance connected to
// your Firebase project.
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);

// Function to write user data to Firebase Realtime Database
function writeUserData(
    userId,
    firstname,
    lastname,
    age,
    gender,
    contactnumber,
    permanentaddress,
    currentaddress,
    gmail,
    interestarea,
    height
) {
    // Get the database instance
    // const db = getDatabase();

    // Create a reference/points to 'users/{userId}' and set the data
    // (name and email)

    set(ref(db, 'users/' + userId), {
        firstname: firstname,
        lastname: lastname,
        age: age,
        gender: gender,
        contactnumber: contactnumber,
        permanentaddress: permanentaddress,
        currentaddress: currentaddress,
        gmail: gmail,
        interestarea: interestarea,
        height: height,
    });
}

writeUserData(
    1,
    "Preshika",
    "Thapa",
    "22",
    "female",
    "9822415141",
    "Udaypur",
    "Maitadevi",
    "preshikathapa392@gmail.com",
    "Cybersecurity",
    "5.6"
);

writeUserData(
    2,
    "Ritika",
    "Basnet",
    "23",
    "Female",
    "9812233445",
    "Biratnagar",
    "Baluwatar",
    "ritikabasnet@gmail.com",
    "Mobile App Development",
    "4.8"
);

writeUserData(
    3,
    "Nikhil",
    "Raut",
    "23",
    "Male",
    "9812345678",
    "Kathmandu",
    "Baneshwor",
    "nikhilraut@gmail.com",
    "Software Engineering",
    "5.4"
);

writeUserData(
    4,
    "Prija",
    "Sanjel",
    "21",
    "Female",
    "9845678912",
    "Bhaktapur",
    "Koteshwor",
    "prijasanjel@gmail.com",
    "UI/UX Design",
    "4.9"
);

writeUserData(
    5,
    "Simon Raj Bir",
    "Shrestha",
    "24",
    "Male",
    "9867543210",
    "Lalitpur",
    "Jawalakhel",
    "simonraj@gmail.com",
    "Networking",
    "5.8"
);

writeUserData(
    6,
    "Aayush",
    "Sharma",
    "22",
    "Male",
    "9801234567",
    "Pokhara",
    "Kalanki",
    "aayushsharma@gmail.com",
    "Artificial Intelligence",
    "5.7"
);

writeUserData(
    7,
    "Sneha",
    "Karki",
    "20",
    "Female",
    "9819988776",
    "Chitwan",
    "New Baneshwor",
    "snehakarki@gmail.com",
    "Data Science",
    "5.4"
);

writeUserData(
    8,
    "Rohan",
    "Adhikari",
    "23",
    "Male",
    "9841122334",
    "Dharan",
    "Pepsicola",
    "rohanadhikari@gmail.com",
    "Cloud Computing",
    "5.3"
);

writeUserData(
    9,
    "Anisha",
    "Gurung",
    "21",
    "Female",
    "9867788990",
    "Butwal",
    "Satdobato",
    "anishagurung@gmail.com",
    "Web Development",
    "5.9"
);

writeUserData(
    10,
    "Sujan",
    "Tamang",
    "22",
    "Male",
    "9808877665",
    "Hetauda",
    "Kapan",
    "sujantamang@gmail.com",
    "Cybersecurity",
    "6.0"
);

// Read data from Firebase
function readUser() {
    const userRef = ref(db, 'users');

    get(userRef).then((snapshot) => {
        snapshot.forEach((childsnapshot) => {
            console.log(childsnapshot.val());
        });
    });
}

readUser();

function updateUserData(userId, updatedData) {
    const userRef = ref(db, 'users/' + userId);

    update(userRef, updatedData)
        .then(() => {
            console.log("User updated successfully");
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
}

// Example usage:
updateUserData(4, {
    firstname: "Preshika",
    lastname: "Thapa",
    age: "23",
    gender: "Female",
    contactnumber: "9827053438",
    permanentaddress: "Udaypur",
    currentaddress: "Gattekulo",
    gmail: "preshikathapa392@gmail.com",
    interestarea: "cybersecurity",
    height: "5.6"
});

updateUserData(4, {
    firstname: "Prija",
    lastname: "Sanjel",
    age: "23",
    gender: "Female",
    contactnumber: "9845073827",
    permanentaddress: "Bhaktapur",
    currentaddress: "anamnagar",
    gmail: "prijasanjel@gmail.com",
    interestarea: "UI/UX Design",
    height: "4.3"
});

updateUserData(5, {
    firstname: "Simon Raj Bir",
    lastname: "shrestha",
    age: "25",
    gender: "Male",
    contactnumber: "9867543210",
    permanentaddress: "kathamandu",
    currentaddress: "Jawalakhel",
    gmail: "simonraj@gmail.com",
    interestarea: "Networking",
    height: "5.8"
});

// function deleteUserData(userId) {
//   const userRef = ref(db, 'users/' + userId);
//   remove(userRef)
//     .then(() => {
//       console.log("User deleted successfully");
//     })
//     .catch((error) => {
//       console.error("Error deleting user:", error);
//     });
// }

// Example usage:
// deleteUserData(1);

// console.log("Added! Good");