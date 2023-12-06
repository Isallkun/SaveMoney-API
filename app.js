const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const { admin } = require("./config/admin");

const app = express();
app.use(bodyParser.json());

// Middleware untuk verifikasi token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Rute untuk verifikasi token
app.use("/auth/verifyToken", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ message: "Token verified", decodedToken });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Rute-rute yang membutuhkan verifikasi token
app.use("/auth/protected", verifyToken); // Contoh rute yang perlu verifikasi token
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
});
