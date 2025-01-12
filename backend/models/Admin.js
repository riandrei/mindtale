const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String,
    school: String,
})

module.exports = Admin = mongoose.model("admin", AdminSchema);