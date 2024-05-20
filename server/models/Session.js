const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  story: {
    type: Schema.Types.ObjectId,
    ref: "story",
  },
  history: [
    {
      role: {
        type: String,
        required: true,
      },
      parts: [
        {
          text: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  scenarioHistory: [
    {
      type: String,
    },
  ],
  assesment: {
    questions: [],
    correctAnswers: [],
    assesmentScore: {
      type: Number,
      default: null,
    },
  },
});

module.exports = Session = mongoose.model("session", SessionSchema);
