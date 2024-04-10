const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      userName: {
        type: String,
        required: true,
      },
      userImg: {
        type: String,
        required: true,
      },
      reviewStar: {
        type: Number,
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  imgURL: {
    type: String,
    required: true,
  },
});

module.exports = Story = mongoose.model("story", StorySchema);
