const bcrypt = require("bcrypt");
const { db } = require("../config/admin");
const UserModel = require("../models/userModel");

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Enkripsi password sebelum registrasi
      const userModel = new UserModel();
      const response = await userModel.register(email, hashedPassword); // Gunakan password yang telah dienkripsi

      // Jika registrasi berhasil, tambahkan user ke koleksi 'users' di Firestore
      await db.collection("users").add({ email, password: hashedPassword }); // Tambahkan email dan password yang dienkripsi

      res.status(201).json({ message: "User registered successfully", uid: response.uid });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userModel = new UserModel();
      const uid = await userModel.verifyUser(email, password); // Verifikasi password sebelum login

      if (uid) {
        // Jika verifikasi berhasil, kirimkan respons login sukses
        res.status(200).json({ message: "Login successful", uid });
      } else {
        res.status(401).json({ message: "Login failed", error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(401).json({ message: "Login failed", error: error.message });
    }
  },
};

module.exports = AuthController;
