// userRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middleware/verifyToken");

router.get("/user", verifyToken, UserController.getUser);

module.exports = router;
