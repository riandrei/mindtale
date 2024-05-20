const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const cloudinary = require("cloudinary").v2;

const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");

const app = express();
app.use(
  cors({
    origin: "https://mindtale-b9de5fd2accb.herokuapp.com",
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 3001;
const dbURI = process.env.DB_TEST_URI;

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_TEST_API_KEY);

// gemini();

// async function gemini() {
//   const model = generativeAI.getGenerativeModel({
//     model: "gemini-pro",
//   });

//   const result = await chat.sendMessage(
//     `The story is titled Dragons Realm of Treasures. It is about a guy who stumbles upon a dragons lair full of goodies.`
//   );

//   const response = await result.response;

//   const text = response.text();
//   const trimmedText = text.trim();

//   console.log(trimmedText);

//   const history = await chat.getHistory();

//   console.log(history);
// }
