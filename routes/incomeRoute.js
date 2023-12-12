//historyRoute.js
const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

router.post("/users/incomes", incomeController.addIncome);

// Add other routes as needed for fetching, updating, or deleting expenses/incomes

module.exports = router;
