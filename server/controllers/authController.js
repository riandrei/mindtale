const bcrypt = require("bcrypt");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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
        tag: name.slice(0, 4),
      });

      newUser
        .save()
        .then(() => {
          sendEmail(email, verificationCode);
          return res.status(201).json({ message: "User created" });
        })
        .catch((err) => res.status(400).json({ error: "Error creating user" }));
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
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      const userInfo = {
        email: user.email,
        username: user.username,
        id: user._id,
        verified: user.verified,
        savedStories: user.savedStories,
        completedStories: user.completedStories,
        friends: user.friends,
        friendRequests: user.friendRequests,
        profilePicture: user.profilePicture,
        history: user.history,
        visited: user.visited,
        tag: user.tag,
        bio: user.bio,
        token,
      };

      return res.status(200).json({ message: "User signed in", userInfo });
    });
  });
};

module.exports.signUpWithGoogle = (req, res) => {
  const user = res.userInfo;

  const { email, name, picture } = user;
  const password = email + process.env.GOOGLE_OAUTH_KEY;

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
        username: name,
        profilePicture: picture,
        verified: true,
        tag: name.slice(0, 4),
      });

      newUser
        .save()
        .then(() => {
          return res.status(201).json({ message: "User created", email });
        })
        .catch((err) => res.status(400).json({ error: "Error creating user" }));
    });
  });
};

module.exports.signInWithGoogle = (req, res) => {
  const user = res.userInfo;

  console.log(user);

  const { email } = user;
  const password = email + process.env.GOOGLE_OAUTH_KEY;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      const userInfo = {
        email: user.email,
        username: user.username,
        id: user._id,
        verified: user.verified,
        savedStories: user.savedStories,
        completedStories: user.completedStories,
        friends: user.friends,
        friendRequests: user.friendRequests,
        profilePicture: user.profilePicture,
        history: user.history,
        visited: user.visited,
        tag: user.tag,
        bio: user.bio,
        token,
      };

      return res.status(200).json({ message: "User signed in", userInfo });
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
      .then(() => res.status(200).json({ message: "User verified" }))
      .catch((err) => res.status(400).json({ error: "Error verifying user" }));
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
      savedStories: user.savedStories,
      completedStories: user.completedStories,
      friends: user.friends,
      friendRequests: user.friendRequests,
      profilePicture: user.profilePicture,
      history: user.history,
      visited: user.visited,
      tag: user.tag,
      bio: user.bio,
    };

    return res.status(200).json({ userInfo });
  });
};

module.exports.toggleUserBookmark = (req, res) => {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const index = user.savedStories.indexOf(storyId);

    if (index === -1) {
      user.savedStories.push(storyId);
    } else {
      user.savedStories.splice(index, 1);
    }

    user
      .save()
      .then(() => res.status(200).json({ message: "Bookmark toggled" }))
      .catch((err) =>
        res.status(400).json({ error: "Error toggling bookmark" })
      );
  });
};

module.exports.addVisited = (req, res) => {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      const existingStory = user.visited.find(
        (visit) => visit.story.toString() === storyId
      );
      if (existingStory) {
        existingStory.date = new Date();
      } else {
        user.visited.push({ story: storyId, date: new Date() });
      }
      return user.save();
    })
    .then((user) => {
      res.status(200).json({ message: "Story added to visited" });
    })
    .catch((error) => {
      // ...
    });
};

module.exports.addHistory = (req, res, next) => {
  const { storyId } = req.params;
  const { email } = req.user;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      const existingStory = user.history.find(
        (history) => history.story.toString() === storyId
      );
      if (existingStory) {
        existingStory.date = new Date();
      } else {
        user.history.push({ story: storyId, date: new Date() });
      }
      return user.save();
    })
    .then((user) => {
      console.log("History added");
      next();
    })
    .catch((error) => {
      // ...
    });
};

module.exports.getUsers = (req, res) => {
  User.find().then((users) => {
    const filteredUsers = users.map(
      ({ username, tag, profilePicture, _id }) => {
        return { username, tag, profilePicture, _id };
      }
    );
    return res
      .status(200)
      .json({ message: "Get Users Success", users: filteredUsers });
  });
};

module.exports.updateUser = (req, res) => {
  const { email } = req.user;
  const profilePicture = req.profilePicture;
  const { username, bio, tag } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log(profilePicture);

    user.username = username;
    user.profilePicture = profilePicture;
    user.bio = bio;
    user.tag = tag;

    // cloudinary.uploader
    //   .upload(profilePicture.path, {
    //     unique_filename: true,
    //     folder: "Mindtale/profilePictures/",
    //   })
    //   .then((result) => {
    //     fs.unlinkSync(profilePicture.path);

    //     user.profilePicture = result.secure_url;

    //     user
    //       .save()
    //       .then(() => res.status(200).json({ message: "User updated" }))
    //       .catch((err) =>
    //         res.status(400).json({ error: "Error updating user" })
    //       );
    //   });

    user
      .save()
      .then(() => res.status(200).json({ message: "User updated" }))
      .catch((err) => res.status(400).json({ error: "Error updating user" }));
  });
};

module.exports.addFriend = (req, res) => {
  const { userId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    User.findOne({ _id: userId }).then((friend) => {
      friend.friendRequests.push(user._id);

      friend.save().then(() => {
        return res.status(200).json({ message: "Friend request sent" });
      });
    });
  });
};

module.exports.acceptFriendRequest = (req, res) => {
  const { friendId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    user.friends.push(friendId);
    user.friendRequests = user.friendRequests.filter((request) => {
      return request.toString() !== friendId;
    });

    user.save().then(() => {
      return res.status(200).json({ message: "Friend request accepted" });
    });
  });
};

module.exports.declineFriendRequest = (req, res) => {
  const { friendId } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    user.friendRequests = user.friendRequests.filter((request) => {
      return request.toString() !== friendId;
    });

    user.save().then(() => {
      return res.status(200).json({ message: "Friend request declined" });
    });
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
