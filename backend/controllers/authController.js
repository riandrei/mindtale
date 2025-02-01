const bcrypt = require("bcrypt");
const formData = require("form-data");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const speech = require("@google-cloud/speech");
const { Resend } = require("resend");
const fs = require("fs");

const User = require("../models/User");
const Session = require("../models/Session");

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
        tag: Math.floor(1000 + Math.random() * 9000),
        school: "Independent",
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

      const token = jwt.sign(
        { email, school: user.school },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

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
      storyPreference: user.storyPreference,
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

module.exports.submitUserData = (req, res) => {
  const { email } = req.user;
  const profilePicture = req.profilePicture;
  const { name, birthday, school, sex, gradeLevel, age, bio } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.username = name;
    user.birthday = birthday;
    user.school = school;
    user.sex = sex;
    user.gradeLevel = gradeLevel;
    user.age = age;
    user.bio = bio;
    user.profilePicture = profilePicture;

    user
      .save()
      .then(() => res.status(200).json({ message: "User updated" }))
      .catch((err) => res.status(400).json({ error: "Error updating user" }));
  });
};

module.exports.submitUserPreference = (req, res) => {
  const { email } = req.user;
  const { userPreference } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.storyPreference = userPreference;

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

module.exports.submitCompletedStory = (req, res) => {
  const { storyId } = req.params;
  const { assesmentScore } = req.body;
  const { email } = req.user;

  Story.findOne({ _id: storyId }).then((story) => {
    if (!story) {
      return res.status(400).json({ error: "Story not found" });
    }

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      user.completedStories.push({
        story: storyId,
        assesmentScore,
        tags: story.tags,
      });

      user
        .save()
        .then(() => {
          const newSession = new Session({
            user: user._id,
            story: storyId,
            history: [],
            scenarioHistory: [],
            assesment: {},
          });
          newSession.save().then(() => {
            return res.status(200).json({ message: "Story completed" });
          });
        })
        .catch((err) =>
          res.status(400).json({ error: "Error completing story" })
        );
    });
  });
};

module.exports.getRanking = (req, res) => {
  User.find().then((users) => {
    const ranking = users.map((user) => {
      const { completedStories, username, profilePicture } = user;

      const totalScore =
        completedStories.reduce(
          (acc, story) => acc + Number(story.assesmentScore),
          0
        ) * 100;

      const lastCompletedStory =
        user.completedStories[user.completedStories.length - 1];

      let lastUpdated = "N/A";

      if (lastCompletedStory) {
        lastUpdated = lastCompletedStory.date;
      }

      return { username, profilePicture, totalScore, lastUpdated };
    });

    res.status(200).json({ ranking });
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
  const resend = new Resend(process.env.RESEND_API_KEY);

  (async () => {
    try {
      const data = await resend.emails.send({
        from: `MindTale <onboarding@mindtale.site>`,
        to: [`${email}`],
        subject: "Verification Code",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    background-color: #007bff;
                    color: white;
                    padding: 10px 0;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    color: #007bff;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
        
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>${email}</strong>,</p>
                    <p>Thank you for signing up for our service! To complete your registration, please verify your email address using the verification code below:</p>
                    <div class="code">${verificationCode}</div>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>Best regards,<br>The MindTale Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 MindTale. All rights reserved.</p>
                </div>
            </div>
        
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.log(error);
    }
  })();
}

module.exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const verificationCode = user.verificationCode;

    (async () => {
      try {
        const data = await resend.emails.send({
          from: `MindTale <onboarding@mindtale.site>`,
          to: [`${email}`],
          subject: "Password Reset",
          html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 30px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        background-color: #007bff;
                        color: white;
                        padding: 10px 0;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    .code {
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                        color: #007bff;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        font-size: 14px;
                        color: #666;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
            
                <div class="container">
                    <div class="header">
                        <h1>Password Reset</h1>
                    </div>
                    <div class="content">
                        <p>Dear <strong>${email}</strong>,</p>
                        <p>You can reset your password using the verification code below:</p>
                        <div class="code">${verificationCode}</div>
                        <p>If you didn't request this, please ignore this email.</p>
                        <p>Best regards,<br>The MindTale Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 MindTale. All rights reserved.</p>
                    </div>
                </div>
            
            </body>
            </html>
            `,
        });

        return res.status(200).json({ message: "Password reset email sent" });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ error: "Error sending password reset email" });
      }
    })();
  });
};

module.exports.checkVerificationCode = (req, res) => {
  const { email, verificationCode } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    return res.status(200).json({ message: "Verification code matched" });
  });
};

module.exports.changePassword = (req, res) => {
  const { email, newPassword } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    hashPassword(newPassword).then((hash) => {
      user.password = hash;

      user
        .save()
        .then(() => res.status(200).json({ message: "Password updated" }))
        .catch((err) =>
          res.status(400).json({ error: "Error updating password" })
        );
    });
  });
};

module.exports.getWordsStats = (req, res) => {
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    const userWordsData = user.words;

    return res.status(200).json({ userWordsData });
  });
};

module.exports.submitWordInteraction = (req, res) => {
  const { email } = req.user; // Extract user email from the request
  const { word } = req.body; // Extract word from the request body

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.error(`User with email ${email} not found.`);
        return res.status(404).json({ error: "User not found." });
      }

      // Access the user's word list (or initialize it if undefined)
      const existingWords = user.words || [];

      // Find the word in the user's word list
      const existingWord = existingWords.find(
        (w) => w.word === word.toLowerCase()
      );

      if (existingWord) {
        // Convert wordsInteraction to a number, increment it, and store it back as a string
        const currentInteraction = parseInt(existingWord.interactions, 10) || 0;
        existingWord.interactions = (currentInteraction + 1).toString();
      }

      // Save the updated word list back to the user
      user.words = existingWords;

      user
        .save()
        .then(() => {
          res
            .status(200)
            .json({ message: "Word interaction updated successfully." });
        })
        .catch((err) => {
          console.error("Error saving user data:", err);
          res.status(500).json({ error: "Failed to save user data." });
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Error finding user." });
    });
};

const { GoogleGenerativeAI } = require("@google/generative-ai");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = generativeAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

module.exports.submitWordReadingScore = async (req, res) => {
  const client = new speech.SpeechClient({
    projectId: "mindtale",
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const passage = req.body.passage;

  let audioData = req.body.audioData;
  audioData = audioData.replace(/^data:audio\/\w+;base64,/, ""); // Remove prefix if present

  const audio = {
    content: audioData, // Use content for raw base64-encoded audio data
  };

  const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "en-US",
  };

  const request = {
    audio: audio,
    config: config,
  };

  let transcription;

  try {
    const [response] = await client.recognize(request);
    transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    // res.status(200).send({ transcription });
  } catch (error) {
    console.error("Error transcribing audio:", error.message);
    res.status(500).send({ error: error.message });
  }

  const passageWords = normalizeText(passage).split(" ");

  const transcriptionWords = normalizeText(transcription).split(" ");

  const miscues = await getMiscues(passageWords, transcriptionWords);
  const numberOfWords = passageWords.length;

  const wordReadingScore =
    ((numberOfWords - miscues.miscues) / numberOfWords) * 100;

  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { wordReadingType } = req.body;

    if (wordReadingType === "pretest") {
      user.philIRI.preTestWordReadingScore = wordReadingScore;
    } else {
      user.philIRI.postTestWordReadingScore = wordReadingScore;
    }

    await user.save();

    res.status(200).json({
      message: "Word reading score updated successfully",
      wordReadingScore,
    });
  } catch (error) {
    console.error("Error updating word reading score:", error.message);
    res.status(500).send({ error: "Error updating word reading score" });
  }
};

async function getMiscues(passageWords, transcriptionWords) {
  const chat = await model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `I will give you a passage and a transcription. You need to count the number of miscues in the transcription. No need to give the reason. Just give the response in the given format.
  Response Format:
  {
    "miscues": 3
  }
  `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Okay, give me the passage and transcription. I will only respond with {"miscues": number} after this.`,
          },
        ],
      },
    ],
  });

  let retries = 3;
  let miscuesResponse;

  while (retries > 0) {
    try {
      const result = await chat.sendMessage(
        `Here is the passage: ${passageWords}. Here is the transcription: ${transcriptionWords}.`
      );

      const response = await result.response;
      const text = response.text();
      const trimmedText = text.trim();

      const jsonMatch = trimmedText.match(/\{[^}]*"miscues"[^}]*\}/);
      if (jsonMatch) {
        miscuesResponse = JSON.parse(jsonMatch[0]);
        return miscuesResponse;
      } else {
        throw new Error("No valid JSON object found in the response.");
      }
    } catch (error) {
      console.error(
        `Error parsing model response. Retries left: ${retries - 1}.`,
        error.message
      );
      retries--;
    }
  }

  throw new Error("Failed to get valid miscues response after retries.");
}

function normalizeText(text) {
  return text
    .replace(/[.,!?;:"()\-“”]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

module.exports.submitComprehensionScore = async (req, res) => {
  const { questions } = req.body;

  const answers = Object.values(req.body.answers);

  try {
    const chat = await model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `I will provide a list of questions with their correct answers and a list of user-provided answers. Compare the user's answers to the correct answers and count how many are correct. Give me the reasons. Send me the response in the given format:
              Response Format:
              {
                "correctAnswers": <number>
              }`,
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "Understood. Please provide the data." }],
        },
      ],
    });

    const result = await chat.sendMessage(
      `Here are the questions with correct answers: ${JSON.stringify(
        questions
      )}. Here are the user's answers: ${JSON.stringify(answers)}.`
    );

    const response = await result.response;
    const text = response.text();
    const trimmedText = text.trim();

    // Extract and parse the AI's JSON response
    const jsonMatch = trimmedText.match(/\{[^}]*"correctAnswers"[^}]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON response from the AI.");
    }

    const scoreData = JSON.parse(jsonMatch[0]);
    const correctAnswers = scoreData.correctAnswers;

    const comprehensionScore = (correctAnswers / answers.length) * 100;

    // Save to the user's record (example assumes Mongoose and a `User` model)
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { comprehensionType } = req.body;

    if (comprehensionType === "pretest") {
      user.philIRI.preTestComprehensionScore = comprehensionScore;
    } else {
      user.philIRI.postTestComprehensionScore = comprehensionScore;
    }

    await user.save();

    res.status(200).json({
      message: "Comprehension score updated successfully.",
      correctAnswers,
    });
  } catch (error) {
    console.error("Error evaluating comprehension score:", error.message);
    res.status(500).send({ error: "Failed to evaluate comprehension score." });
  }
};

module.exports.getPHILIRIResults = async (req, res) => {
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      console.error(`User with email ${email} not found.`);
      return res.status(404).json({ error: "User not found." });
    }

    const { philIRI } = user;

    if (!philIRI) {
      return res.status(404).json({ error: "PHIL-IRI data not found." });
    }

    return res.status(200).json({ philIRI });
  });
};
