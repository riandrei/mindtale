const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const User = require("../models/User");
const Admin = require("../models/Admin")
const SchoolStory = require("../models/SchoolStory")

module.exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ error: "Invalid username" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({ message: "Admin signed in", token });
};

async function getStoryVisitCounts() {
  try {
    const visitCounts = await User.aggregate([
      { $unwind: "$visited" }, // Unwind the visited array
      {
        $group: {
          _id: "$visited.story", // Group by story ID
          visitCount: { $sum: 1 }, // Count each occurrence
        },
      },
      { $sort: { visitCount: -1 } }, // Optional: sort by most visited stories
    ]);

    return visitCounts;
  } catch (err) {
    console.error("Error fetching visit counts:", err);
    throw err;
  }
}

async function getAverageAssessmentScores() {
  try {
    const averageScores = await User.aggregate([
      { $unwind: "$completedStories" }, // Unwind the completedStories array
      {
        $match: {
          "completedStories.assesmentScore": { $ne: null }, // Only include entries with a score
        },
      },
      {
        $group: {
          _id: "$completedStories.story", // Group by story ID
          averageScore: {
            $avg: { $toDouble: "$completedStories.assesmentScore" }, // Calculate average, converting to double
          },
        },
      },
      { $sort: { averageScore: -1 } }, // Optional: sort by highest average score
    ]);

    return averageScores;
  } catch (err) {
    console.error("Error fetching average scores:", err);
    throw err;
  }
}

async function getBookmarkCounts() {
  try {
    const bookmarkCounts = await User.aggregate([
      { $unwind: "$savedStories" }, // Unwind the savedStories array
      {
        $group: {
          _id: "$savedStories", // Group by story ID (bookmarked story)
          bookmarkCount: { $sum: 1 }, // Count each occurrence as a bookmark
        },
      },
      { $sort: { bookmarkCount: -1 } }, // Optional: sort by most bookmarked stories
    ]);

    return bookmarkCounts;
  } catch (err) {
    console.error("Error fetching bookmark counts:", err);
    throw err;
  }
}

module.exports.getStoriesStats = async (req, res) => {
  const visitCounts = await getStoryVisitCounts();
  const averageScores = await getAverageAssessmentScores();
  const bookmarkCounts = await getBookmarkCounts();

  return res.status(200).json({ visitCounts, averageScores, bookmarkCounts });
};

module.exports.addAdmin = (req,res) => {
  console.log(req.body)
  const { school, username, password } = req.body.formData

  hashPassword(password).then((hash) => {
    Admin.findOne({ username }).then((admin) => {
      if (admin) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const newAdmin = new Admin({
        username: username,
        password: hash,
        school: school
      });

      newAdmin
        .save()
        .then(() => {
          return res.status(201).json({ message: "Admin created" });
        })
        .catch((err) => res.status(400).json({ error: "Error creating admin" }));
    });
  });

  console.log(school, username, password)
}

module.exports.schoolAdminLogin = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password)

  Admin.findOne({username}).then((admin) => {
    if(!admin) {
      return res.status(401).json({ error: "Invalid username" });
    }

    bcrypt.compare(password, admin.password).then((result) => {
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ username, school: admin.school }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      const userInfo = {
        username: admin.username,
        school: admin.school,
        token
      };

      return res.status(200).json({ message: "Admin signed in", userInfo });
    });

  })
};

module.exports.getAllowedStories = (req,res) => {
  const { school } = req.user
  SchoolStory.findOne({school}).then((schoolData) => {
    if(!schoolData) {
      const newSchoolStory = new SchoolStory({pending: [], approved: [], rejected: [], school})

      newSchoolStory
        .save()
        .then((data) => {
          console.log(data, 'getallowed')
          return res.status(201).json({ schoolData: data, message: "School story created" });
        })
        .catch((err) => res.status(400).json({ error: "Error creating admin" }));
    }

    return res.status(200).json({schoolData, message: "School story data fetched"})
  })
  console.log(req.user)
}

module.exports.approveStory = (req, res) => {
  const { school } = req.user; // Get the school from the user
  const { storyId } = req.params; // Get the storyId from the request parameters

  SchoolStory.findOne({ school }).then((schoolData) => {
    if (!schoolData) {
      return res.status(404).json({ message: "School data not found" });
    }

    console.log('approve deez')

    // Check if the storyId exists in the rejected array
    const rejectedIndex = schoolData.rejected.indexOf(storyId);
    if (rejectedIndex !== -1) {
      // Remove storyId from rejected
      schoolData.rejected.splice(rejectedIndex, 1);
    }

    // Add storyId to approved if not already there
    if (!schoolData.approved.includes(storyId)) {
      schoolData.approved.push(storyId);
    }

    // Save the updated document
    schoolData
      .save()
      .then((schoolData) => {
        res.status(200).json({ schoolData, message: "Story approved successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error approving story" });
      });
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "Error fetching school data" });
  });
};

module.exports.rejectStory = (req, res) => {
  const { school } = req.user; // Get the school from the user
  const { storyId } = req.params; // Get the storyId from the request parameters

  SchoolStory.findOne({ school }).then((schoolData) => {
    if (!schoolData) {
      return res.status(404).json({ message: "School data not found" });
    }

    console.log('approve deez')

    // Check if the storyId exists in the approved array
    const approvedIndex = schoolData.approved.indexOf(storyId);
    if (approvedIndex !== -1) {
      // Remove storyId from approved
      schoolData.approved.splice(approvedIndex, 1);
    }

    // Add storyId to rejected if not already there
    if (!schoolData.rejected.includes(storyId)) {
      schoolData.rejected.push(storyId);
    }

    // Save the updated document
    schoolData
      .save()
      .then((schoolData) => {
        res.status(200).json({ schoolData, message: "Story approved successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error approving story" });
      });
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "Error fetching school data" });
  });
};


function hashPassword(password) {
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });
}