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

  getAllIncome: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi

    try {
      const incomeSnapshot = await db.collection("users").doc(uid).collection("incomes").get();

      const incomes = [];
      incomeSnapshot.forEach((doc) => {
        incomes.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      res.status(200).json({ message: "incomes retrieved successfully", incomes });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: "Failed to retrieve incomes", error: error.message });
    }
  },

  // Add other controller methods for fetching, updating, or deleting incomes

  getIncomeById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const incomeId = req.params.uid; // Mendapatkan UID income dari URL

    try {
      const incomeRef = db.collection("users").doc(uid).collection("incomes").doc(incomeId);

      // Mengambil data income berdasarkan ID yang diberikan
      const incomeDoc = await incomeRef.get();
      if (!incomeDoc.exists) {
        return res.status(404).json({ message: "income not found" });
      }

      const incomeData = incomeDoc.data();
      res.status(200).json({ message: "Income retrieved successfully", data: incomeData });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve income", error: error.message });
    }
  },

  updateIncomeById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const { amount, category, note } = req.body;
    const incomeId = req.params.uid; // Mendapatkan UID income dari URL

    try {
      const incomeRef = db.collection("users").doc(uid).collection("incomes").doc(incomeId);

      // Memeriksa apakah income dengan ID yang diberikan ada
      const incomeDoc = await incomeRef.get();
      if (!incomeDoc.exists) {
        return res.status(404).json({ message: "income not found" });
      }

      // Melakukan update pada data income
      await incomeRef.update({
        amount: amount || incomeDoc.data().amount || 0,
        category: category || incomeDoc.data().category || "Default Category",
        note: note || incomeDoc.data().note || "Default Note",
        timestamp: admin.firestore.Timestamp.now(),
      });

      const updatedincomeDoc = await incomeRef.get();
      const updatedincomeData = updatedincomeDoc.data();

      res.status(200).json({ message: "Income updated successfully", data: updatedincomeData });
    } catch (error) {
      res.status(400).json({ message: "Failed to update income", error: error.message });
    }
  },

  deleteIncomeById: async (req, res) => {
    const uid = req.session.uid; // Mendapatkan UID pengguna dari sesi
    const incomeId = req.params.uid; // Mendapatkan UID income dari URL

    try {
      const incomeRef = db.collection("users").doc(uid).collection("incomes").doc(incomeId);

      // Memeriksa apakah income dengan ID yang diberikan ada
      const incomeDoc = await incomeRef.get();
      if (!incomeDoc.exists) {
        return res.status(404).json({ message: "Income not found" });
      }

      // Melakukan penghapusan data income
      await incomeRef.delete();

      res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete income", error: error.message });
    }
  },
};

module.exports = incomeController;
