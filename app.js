const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoute");
const protectedRoute = require("./routes/protectedRoute");
const userRoutes = require("./routes/userRoute");
const verifyToken = require("./middleware/verifyToken");

const app = express();

// Gunakan middleware express-session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Gunakan middleware body-parser jika diperlukan
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/auth/protected", verifyToken, protectedRoute);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
});
