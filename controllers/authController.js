const { db } = require("../config/admin");
const UserModel = require("../models/userModel");

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userModel = new UserModel();
      const response = await userModel.register(email, password); // Gunakan password langsung tanpa enkripsi

      // Jika registrasi berhasil, tambahkan user ke koleksi 'users' di Firestore
      await db.collection("users").add({ email, password }); // Tambahkan email dan password tanpa enkripsi

      res.status(201).json({ message: "User registered successfully", uid: response.uid });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userModel = new UserModel();

      // Ambil dokumen pengguna berdasarkan email dari Firestore
      const userDoc = await db.collection("users").where("email", "==", email).get();
      if (userDoc.empty) {
        throw new Error("User not found");
      }

      let user;
      userDoc.forEach((doc) => {
        user = doc.data();
      });

      // Bandingkan password yang diberikan dengan password yang ada di Firestore
      if (user.password === password) {
        // Jika verifikasi berhasil, kirimkan respons login sukses
        res.status(200).json({ message: "Login successful", uid: user.uid });
      } else {
        res.status(401).json({ message: "Login failed", error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(401).json({ message: "Login failed", error: error.message });
    }
  },
};

module.exports = AuthController;
