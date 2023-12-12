const { db, admin } = require("../config/firebase");

const expenseController = {
  addExpense: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const { amount, category, note } = req.body;

    try {
      const expenseDocRef = await db
        .collection("users")
        .doc(uid)
        .collection("expense")
        .add({
          amount: amount || 0,
          category: category || "Default Category",
          note: note || "Default Note",
          timestamp: admin.firestore.Timestamp.now(),
        });
      const expense = (await expenseDocRef.get()).data();

      res.status(200).json({ message: "Expense added successfully", body: expense });
    } catch (error) {
      //   console.log(error);
      res.status(400).json({ message: "Failed to add expense", error: error.message });
    }
  },

  getAllExpense: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi

    try {
      const expenseSnapshot = await db.collection("users").doc(uid).collection("expense").get();

      const expenses = [];
      expenseSnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: "Failed to retrieve expenses", error: error.message });
    }
  },

  getExpenseById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const expenseId = req.params.uid; // Mendapatkan UID expense dari URL

    try {
      const expenseRef = db.collection("users").doc(uid).collection("expense").doc(expenseId);

      // Mengambil data expense berdasarkan ID yang diberikan
      const expenseDoc = await expenseRef.get();
      if (!expenseDoc.exists) {
        return res.status(404).json({ message: "Expense not found" });
      }

      const expenseData = expenseDoc.data();
      res.status(200).json({ message: "Expense retrieved successfully", data: expenseData });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve expense", error: error.message });
    }
  },

  updateExpenseById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const { amount, category, note } = req.body;
    const expenseId = req.params.uid; // Mendapatkan UID expense dari URL

    try {
      const expenseRef = db.collection("users").doc(uid).collection("expense").doc(expenseId);

      // Memeriksa apakah expense dengan ID yang diberikan ada
      const expenseDoc = await expenseRef.get();
      if (!expenseDoc.exists) {
        return res.status(404).json({ message: "Expense not found" });
      }

      // Melakukan update pada data expense
      await expenseRef.update({
        amount: amount || expenseDoc.data().amount || 0,
        category: category || expenseDoc.data().category || "Default Category",
        note: note || expenseDoc.data().note || "Default Note",
        timestamp: admin.firestore.Timestamp.now(),
      });

      const updatedExpenseDoc = await expenseRef.get();
      const updatedExpenseData = updatedExpenseDoc.data();

      res.status(200).json({ message: "Expense updated successfully", data: updatedExpenseData });
    } catch (error) {
      res.status(400).json({ message: "Failed to update expense", error: error.message });
    }
  },

  deleteExpenseById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const expenseId = req.params.uid; // Mendapatkan UID expense dari URL

    try {
      const expenseRef = db.collection("users").doc(uid).collection("expense").doc(expenseId);

      // Memeriksa apakah expense dengan ID yang diberikan ada
      const expenseDoc = await expenseRef.get();
      if (!expenseDoc.exists) {
        return res.status(404).json({ message: "Expense not found" });
      }

      // Melakukan penghapusan data expense
      await expenseRef.delete();

      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete expense", error: error.message });
    }
  },
};

module.exports = expenseController;
