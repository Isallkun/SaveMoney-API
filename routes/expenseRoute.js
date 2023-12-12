//historyRoute.js
const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/users/expense", expenseController.addExpense);
router.get("/users/expense", expenseController.getAllExpense);
router.get("/users/expense/:uid", expenseController.getExpenseById);
router.put("/users/expense/:uid", expenseController.updateExpenseById);
router.delete("/users/expense/:uid", expenseController.deleteExpenseById);

// Add other routes as needed for fetching, updating, or deleting expenses/incomes

module.exports = router;
