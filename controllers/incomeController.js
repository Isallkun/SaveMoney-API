const { db, admin } = require("../config/firebase");

const incomeController = {
  addIncome: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const { amount, category, note } = req.body;

    try {
      const incomesDocRef = await db
        .collection("users")
        .doc(uid)
        .collection("incomes")
        .add({
          amount: amount || 0,
          category: category || "Default Category",
          note: note || "Default Note",
          timestamp: admin.firestore.Timestamp.now(),
        });
      const incomes = (await incomesDocRef.get()).data();

      res.status(200).json({ message: "Income added successfully", body: incomes });
      //   return { message: "Income added successfully" };
    } catch (error) {
      //   console.log(error);
      res.status(400).json({ message: "Failed to add income", error: error.message });
      //   return { message: "Failed to add income", error: error.message };
    }
  },

  // Add other controller methods for fetching, updating, or deleting incomes
};

module.exports = incomeController;
