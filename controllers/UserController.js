const { db, firebase, admin, usersRef } = require("../config/firebase");

const UserController = {
  getUser: async (req, res) => {
    try {
      // Dapatkan UID pengguna dari sesi atau token
      const uid = req.session.uid; // Sesuaikan dengan cara Anda mendapatkan UID pengguna yang masuk

      if (!uid) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      // Dapatkan data pengguna dari Firestore berdasarkan UID
      const userDoc = await db.collection("users").doc(uid).get();

      if (!userDoc.exists) {
        res.status(404).json({ message: "User not found" });
        console.log(!userDoc.exists);
        return;
      }

      const userData = userDoc.data();

      res.status(200).json({ message: "User data retrieved successfully", user: userData });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user data", error: error.message });
      console.error(error);
    }
  },

  // getUser: async (req, res) => {
  //   try {
  //     const userId = req.params.id;
  //     const userDoc = db.collection("users").doc(userId);
  //     const user = await userDoc.get();

  //     if (!user.exists) {
  //       res.status(404).json({ message: "User not found" });
  //       return;
  //     }

  //     const userData = user.data();

  //     res.status(200).json({ message: "User data retrieved successfully", user: userData });
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to retrieve user data", error: error.message });
  //     console.error(error);
  //   }
  // },
  // getUser: async (req, res) => {
  //   try {
  //     const token = req.headers.authorization;
  //     const decodedToken = await admin.auth().verifyIdToken(token);

  //     const userDoc = await db.collection("users").doc(decodedToken.uid).get();
  //     const userData = userDoc.data();

  //     const { uid, email, name, photoURL, ...additionalData } = decodedToken;

  //     const combinedUserData = {
  //       uid,
  //       email,
  //       ...(name && { name }),
  //       ...(photoURL && { photoURL }),
  //       ...userData,
  //       ...additionalData,
  //     };

  //     res.status(200).json({ message: "User data retrieved successfully", user: combinedUserData });
  //   } catch (error) {
  //     console.error(error);

  //     const errorMessage = error.message || "Unknown error";
  //     res.status(401).json({ message: "Failed to retrieve user data", error: errorMessage });
  //   }
  // },
};

module.exports = UserController;
