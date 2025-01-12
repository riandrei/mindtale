const Story = require("../models/Story");
const User = require("../models/User");
const SchoolStory = require("../models/SchoolStory")

const cloudinary = require("cloudinary").v2;

module.exports.getAllStories = (req, res) => {
  Story.find().then((stories) => res.status(200).json({ stories }));
};

module.exports.getStories = (req, res) => {
  const {school} = req.user

  console.log(school)

  Story.find().then( async (stories) => {
    if(school !== "Independent") {
      const schoolData = await SchoolStory.findOne({school})
      const approve = schoolData.approved

      const approvedStories = stories.filter((story) => approve.includes(story._id))

      return res.status(200).json({stories: approvedStories})
    }
    return res.status(200).json({ stories })
  });
};

module.exports.postReview = (req, res) => {
  const { id } = req.params;
  const { reviewStar, reviewText } = req.body;
  const { email } = req.user;

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

module.exports.generateStoryCover = (req, res) => {
  const { title, genre } = req.body;

  console.log(title, genre);

  fetch(`https://api.getimg.ai/v1/latent-consistency/text-to-image`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
    },
    body: JSON.stringify({
      model: "lcm-realistic-vision-v5-1",
      prompt: `${title}, ${genre}`,
      width: 512,
      height: 512,
      steps: 8,
    }),
  })
    .then((response) => {
      return response.json().then(({ image }) => {
        const buffer = Buffer.from(image, "base64");

        return cloudinary.uploader.upload(
          `data:image/png;base64,${buffer.toString("base64")}`,
          {
            unique_filename: true,
            folder: "Mindtale/stories/",
          }
        );
      });
    })
    .then((result) => {
      console.log("done uploading");
      return res.status(200).json({ imgURL: result.secure_url });
    })
    .catch((error) => console.error(error));
};

module.exports.addStory = (req, res) => {
  const { title, synopsis, genre, storyType, image } = req.body;

  const story = {
    title,
    synopsis,
    tags: [genre],
    storyType,
    imgURL: image,
  };

  const newStory = new Story(story);

  newStory.save().then((story) => res.status(200).json({ story }));
};

module.exports.deleteStory = (req, res) => {
  const { id } = req.params;

  Story.findByIdAndDelete(id).then((story) => {
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    return res.status(200).json({ message: "Story deleted", storyId: id });
  });
};
