const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const cloudinary = require("cloudinary").v2;
const path = require("path");

const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const allowedOrigin = process.env.APP_ORIGIN || "http://localhost"; // Default fallback

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("Test");
});

const port = process.env.PORT || 3001;
const dbURI = process.env.DB_TEST_URI;

app.use("/api", sessionRoutes);
app.use("/api", authRoutes);
app.use("/api", storyRoutes);
app.use("/api", adminRoutes);

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
