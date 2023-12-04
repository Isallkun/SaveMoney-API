// firebaseConfig.js

const firebase = require("firebase/app");
require("firebase/auth");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Inisialisasi Firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp; // Export Firebase app
