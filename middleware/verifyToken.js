// verifyToken.js
const { auth } = require("../config/admin"); // Ubah ini untuk mengambil objek auth dari admin.js

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization; // Get token from headers

  if (!idToken) {
    return res.status(403).json({ message: "Token not provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken); // Verify token

    // If needed, access the decoded claims from the token
    console.log(decodedToken);

    next(); // Continue if token is valid
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = verifyToken;
