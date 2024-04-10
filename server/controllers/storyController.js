const { red } = require("@mui/material/colors");
const Story = require("../models/Story");
const User = require("../models/User");

module.exports.getStories = (req, res) => {
  Story.find().then((stories) => res.status(200).json({ stories }));
};

module.exports.postReview = (req, res) => {
  const { id } = req.params;
  const { reviewStar, reviewText } = req.body;
  const { email } = req.user;
  console.log(req.user);

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    Story.findById(id).then((story) => {
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }

      const doesReviewExist =
        story.reviews.filter(
          (review) => review.userId.toString() === user._id.toString()
        ).length > 0;

      console.log(doesReviewExist);

      if (doesReviewExist) {
        return res.status(400).json({ message: "Review already exists" });
      }

      const newReview = {
        userId: user._id,
        userName: user.username,
        userImg: user.imgURL || "test",
        reviewStar,
        reviewText,
      };

      story.reviews.push(newReview);

      story
        .save()
        .then((story) =>
          res.status(200).json({ message: "Review posted", story })
        );
    });
  });
};

module.exports.getReviews = (req, res) => {
  const { id } = req.params;

  Story.findById(id).then((story) => {
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    return res.status(200).json({ reviews: story.reviews });
  });
};

module.exports.deleteReview = (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Story.findById(id).then((story) => {
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }

      const reviewIndex = story.reviews.findIndex(
        (review) => review.userId.toString() === user._id.toString()
      );

      if (reviewIndex === -1) {
        return res.status(404).json({ message: "Review not found" });
      }

      story.reviews.splice(reviewIndex, 1);

      story
        .save()
        .then((story) =>
          res.status(200).json({ message: "Review deleted", story })
        );
    });
  });
};
