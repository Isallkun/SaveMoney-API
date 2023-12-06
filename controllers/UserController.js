// UserController.js
const UserModel = require("../models/userModel");

const UserController = {
  getUser: async (req, res) => {
    try {
      const { uid } = req.user; // Ambil UID dari token yang terverifikasi
      const userModel = new UserModel();
      const userData = await userModel.getUser(uid);

      if (userData) {
        res.status(200).json({ message: "User data retrieved successfully", userData });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user data", error: error.message });
    }
  },
};

module.exports = UserController;
