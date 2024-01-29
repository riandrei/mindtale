const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  history: {
    type: String,
    required: true,
  },
});

module.exports = Session = mongoose.model("session", SessionSchema);
