const { admin } = require("../config/admin");

const verifyTokenRoute = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Menyimpan informasi pengguna ke dalam req.user
    next(); // Melanjutkan ke middleware atau handler berikutnya
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyTokenRoute;
