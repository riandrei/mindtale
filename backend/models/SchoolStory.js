const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolStorySchema = new Schema({
    pending: [{type: Schema.Types.ObjectId, ref: "story"}],
    approved: [{type: Schema.Types.ObjectId, ref: "story"}],
    rejected: [{type: Schema.Types.ObjectId, ref: "story"}],
    school: String,
})

module.exports = SchoolStory = mongoose.model("schoolStory", SchoolStorySchema);