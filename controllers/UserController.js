// UserController.js
const { db, auth } = require("../config/firebase");
const UserModel = require("../models/userModel");
const admin = require("../config/firebase");

const UserController = {
  getUser: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decodedToken = await auth.verifyIdToken(token);

      // Lakukan apa pun yang diperlukan dengan decodedToken
      // Contoh: dapatkan informasi pengguna dari token
      const user = decodedToken; // Ganti ini dengan informasi yang ingin kamu dapatkan dari decodedToken

      res.status(200).json({ message: "User data retrieved successfully", user });
    } catch (error) {
      res.status(401).json({ message: "Failed to retrieve user data", error: error.message });
    }
  },
};

module.exports = UserController;
