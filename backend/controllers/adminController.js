const jwt = require("jsonwebtoken");

const User = require("../models/User");

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
