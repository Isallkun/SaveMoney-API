// verifyToken.js
const { admin } = require("../config/admin");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  try {
    console.log(admin.auth().currentUser.getToken());
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyToken;
