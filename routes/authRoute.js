// authRoutes.js

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
// const { login } = require("../controllers/authController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
// router.post("/login", login);

module.exports = router;
