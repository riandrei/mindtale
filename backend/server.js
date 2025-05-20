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

// const Papa = require("papaparse");
// const fs = require("fs");
// // const deleteWords = require("./deleteWords");
// function isSignificantWord(wordToCheck) {
//   return new Promise((resolve, reject) => {
//     // Use the callback style of fs.readFile instead of Promise style
//     fs.readFile(
//       "./extended_common_words.csv",
//       { encoding: "utf8" },
//       (err, csvContent) => {
//         if (err) {
//           reject(err);
//           return;
//         }

//         Papa.parse(csvContent, {
//           header: true,
//           skipEmptyLines: true,
//           complete: function (results) {
//             // Convert to lowercase for case-insensitive comparison
//             const wordToCheckLower = wordToCheck.toLowerCase();

//             // Check if the word exists in our common words list
//             const commonWords = results.data.map((row) =>
//               row.Word.toLowerCase()
//             );
//             const isCommon = commonWords.includes(wordToCheckLower);

//             // A word is significant if it's NOT in the common words list
//             resolve(!isCommon);
//           },
//           error: function (error) {
//             reject(error);
//           },
//         });
//       }
//     );
//   });
// }

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
    // deleteWords();
  })
  .catch((err) => console.log(err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
