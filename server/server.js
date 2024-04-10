const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const port = 3001;
const dbURI = process.env.DB_URI;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", sessionRoutes);
app.use("/api", authRoutes);
app.use("/api", storyRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const saveGamesToDatabase = require("../saveGamesToDatabase");

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
    // saveGamesToDatabase();
  })
  .catch((err) => console.log(err));
