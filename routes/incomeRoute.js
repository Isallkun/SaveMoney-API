//historyRoute.js
const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

router.post("/users/incomes", incomeController.addIncome);
router.get("/users/incomes", incomeController.getAllIncome);
router.get("/users/incomes/:uid", incomeController.getIncomeById);
router.put("/users/incomes/:uid", incomeController.updateIncomeById);
router.delete("/users/incomes/:uid", incomeController.deleteIncomeById);

// Add other routes as needed for fetching, updating, or deleting expenses/incomes

module.exports = router;
