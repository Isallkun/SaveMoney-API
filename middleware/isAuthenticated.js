const jwt = require("jsonwebtoken");
const { auth } = require("firebase-admin");

const isAuthenticated = async (req, res, next) => {
  if (req.session?.uid) {
    return next();
  }
  res.status(401).json({ message: "Authentication invalid" });
};
const authJwt = async (req, res, next) => {
  // check header
  // const authHeader = req.headers.authorization;
};

(module.exports = isAuthenticated), authJwt;
