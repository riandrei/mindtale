const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  savedStories: [
    {
      type: Schema.Types.ObjectId,
      ref: "story",
    },
  ],
  completedStories: [
    {
      story: {
        type: Schema.Types.ObjectId,
        ref: "story",
      },
      tags: [String],
      assesmentScore: {
        type: String,
        default: null,
      },
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  profilePicture: {
    type: String,
    default: "https://google.com",
  },
  history: [
    {
      story: {
        type: Schema.Types.ObjectId,
        ref: "story",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  visited: [
    {
      story: {
        type: Schema.Types.ObjectId,
        ref: "story",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
