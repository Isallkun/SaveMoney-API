// userRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  // Lakukan sesuatu setelah verifikasi berhasil
  res.status(200).json({ message: "User data retrieved", user: req.user });
});

module.exports = router;
