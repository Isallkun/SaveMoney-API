const { db, auth } = require("../config/admin");

const verifyTokenRoute = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    console.log(req.user);
    next(); // Melanjutkan ke middleware atau handler berikutnya
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyTokenRoute;
