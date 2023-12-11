// userRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUser);
router.get("/users/me", UserController.getUser);
router.put("/users/me", UserController.updateUser);
router.delete("/users/me", UserController.deleteUser);

module.exports = router;
