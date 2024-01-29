const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
const port = 3001;
const dbURI = process.env.DB_URI;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", sessionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));
