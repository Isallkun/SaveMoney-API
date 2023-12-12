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
};

module.exports = expenseController;
