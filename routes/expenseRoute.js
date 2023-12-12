//historyRoute.js
const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/users/expense", expenseController.addExpense);

// Add other routes as needed for fetching, updating, or deleting expenses/incomes

module.exports = router;
