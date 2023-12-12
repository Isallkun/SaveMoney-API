const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoute");
// const protectedRoute = require("./routes/protectedRoute");
const userRoutes = require("./routes/userRoute");
const isAuthenticated = require("./middleware/isAuthenticated");
const expenseRoutes = require("./routes/expenseRoute");
const incomeRoutes = require("./routes/incomeRoute");

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
// app.use("/auth/protected", isAuthenticated, protectedRoute);
app.use("/api", isAuthenticated, userRoutes);
app.use("/api", isAuthenticated, expenseRoutes);
app.use("/api", isAuthenticated, incomeRoutes);

app.get("/", (req, res) => {
  res.send("API IS ONLINE");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
});
