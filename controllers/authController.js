const { db } = require("../config/admin");
const UserModel = require("../models/userModel");
const { admin } = require("../config/admin"); // Perbaiki inisialisasi Firebase

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const userModel = new UserModel();
      const response = await userModel.register(email, password, name);

      await db.collection("users").add({ email, password, name });

      res.status(201).json({ message: "User registered successfully", uid: response.uid });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Dapatkan data pengguna berdasarkan email dari Firestore
      const userDoc = await db.collection("users").where("email", "==", email).get();
      if (userDoc.empty) {
        throw new Error("User not found");
      }

      let user;
      userDoc.forEach((doc) => {
        user = doc.data();
      });

      // Inisialisasi auth dari admin
      const auth = admin.auth();

      // Periksa apakah password cocok (disarankan menggunakan bcrypt)
      if (user.password === password) {
        const token = await auth.createCustomToken(email); // Menggunakan createCustomToken dari auth

        res.status(200).json({
          message: "Login successful",
          token: token,
          user: {
            email: user.email,
            name: user.name,
          },
        });
      } else {
        res.status(401).json({ message: "Login failed", error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(401).json({ message: "Login failed", error: error.message });
    }
  },
};

module.exports = AuthController;
