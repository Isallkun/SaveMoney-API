// userRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/user", UserController.getAllUser);
router.get("/user/me", UserController.getUser);
router.put("/user/me", UserController.updateUser);

module.exports = router;
