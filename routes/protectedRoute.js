const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { admin } = require("../config/firebase");
const UserController = require("../controllers/UserController");

router.use(verifyToken);

// router.get("/user", UserController.getUser);

module.exports = router;
