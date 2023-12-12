// userRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUser);
router.get("/users/current", UserController.getUser);
router.put("/users/current", UserController.updateUser);
router.delete("/users/current", UserController.deleteUser);

module.exports = router;
