const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const protectedRoute = require("./routes/protectedRoute");
const userRoutes = require("./routes/userRoute");
const verifyToken = require("./middleware/verifyToken"); // Import middleware

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/auth/protected", verifyToken, protectedRoute); // Gunakan middleware pada rute yang ingin diproteksi
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
});
