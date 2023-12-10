// UserController.js
const { db, auth } = require("../config/admin");
const UserModel = require("../models/userModel");
const admin = require("../config/admin");

const UserController = {
  getUser: async (req, res) => {
    try {
      const token = req.headers.authorization; // Dapatkan token dari headers

      if (!token) {
        return res.status(403).json({ message: "Token not provided" });
      }

      const decodedToken = await auth.verifyIdToken(token); // Verifikasi token

      // Dapatkan data pengguna berdasarkan UID dari token yang terdekripsi
      const user = await auth.getUser(decodedToken.uid);

      res.status(200).json({ message: "User data retrieved successfully", user });
    } catch (error) {
      res.status(401).json({ message: "Failed to retrieve user data", error: error.message });
    }
  },
};

module.exports = UserController;
