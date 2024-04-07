const bcrypt = require("bcrypt");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.signUp = (req, res, next) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  hashPassword(password).then((hash) => {
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      const newUser = new User({
        email,
        verificationCode,
        password: hash,
        username: email,
      });

      newUser
        .save()
        .then(() => {
          sendEmail(email, verificationCode);
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          res.status(400).json({ error: "Error creating user" });
        });
    });
  });
};

module.exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      const userInfo = {
        email: user.email,
        username: user.username,
        id: user._id,
        verified: user.verified,
        token,
      };

      res.status(200).json({ message: "User signed in", userInfo });
    });
  });
};

module.exports.verify = (req, res) => {
  const { code, email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    user.verified = true;

    user
      .save()
      .then(() => {
        res.status(200).json({ message: "User verified" });
      })
      .catch((err) => {
        res.status(400).json({ error: "Error verifying user" });
      });
  });
};

module.exports.getUser = (req, res) => {
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const userInfo = {
      email: user.email,
      username: user.username,
      id: user._id,
      verified: user.verified,
    };

    res.status(200).json({ userInfo });
  });
};

function hashPassword(password) {
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });
}

function validateEmail(email) {
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return emailRegex.test(email);
}

function sendEmail(email, verificationCode) {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });

  mg.messages
    .create("sandbox2930b2991faf4d08a1dc5a2f685a01ef.mailgun.org", {
      from: "MindTale <mindtale@sandbox2930b2991faf4d08a1dc5a2f685a01ef.mailgun.org>",
      to: [`${email}`],
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}`,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err));
}
