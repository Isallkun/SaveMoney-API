// authController.js

const { db } = require("../config/admin");
const UserModel = require("../models/userModel"); // Pastikan untuk mengimpor model jika digunakan

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userModel = new UserModel(); // Pastikan UserModel diinisialisasi dengan benar
      const response = await userModel.register(email, password); // Panggil fungsi register dengan email dan password

      // Jika registrasi berhasil, tambahkan user ke koleksi 'users' di Firestore
      await db.collection("users").add({ email, password }); // Tambahkan email dan password ke dalam 'users'

      res.status(201).json({ message: "User registered successfully", uid: response.uid });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userModel = new UserModel(); // Pastikan UserModel diinisialisasi dengan benar
      const response = await userModel.login(email, password); // Panggil fungsi login dengan email dan password
      res.status(200).json({ message: "Login successful", uid: response.uid });
    } catch (error) {
      res.status(401).json({ message: "Login failed", error: error.message });
    }
  },
};

module.exports = AuthController;
