// UserModel.js

const { db } = require("../config/firebase");

const UserModel = {
  async addExpense(uid, expenseData) {
    try {
      const userRef = db.collection("users").doc(uid);
      await userRef.collection("expenses").add(expenseData);
      return { message: "Expense added successfully" };
    } catch (error) {
      throw new Error("Failed to add expense: " + error.message);
    }
  },

  async addIncome(uid, incomeData) {
    try {
      const userRef = db.collection("users").doc(uid);
      await userRef.collection("incomes").add(incomeData);
      return { message: "Income added successfully" };
    } catch (error) {
      throw new Error("Failed to add income: " + error.message);
    }
  },

  // Add other methods as needed for fetching, updating, or deleting expenses/incomes
};

module.exports = UserModel;
