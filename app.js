// app.js

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
});
