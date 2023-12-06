const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { admin } = require("../config/admin");

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const decodedToken = req.user;
    const uid = decodedToken.uid;

    // Dapatkan informasi pengguna berdasarkan UID dari Firebase
    const userRecord = await admin.auth().getUser(uid);
    const userData = {
      uid: userRecord.uid,
      email: userRecord.email,
      // tambahkan informasi pengguna lainnya yang kamu perlukan
    };

    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user data" });
  }
});

module.exports = router;
