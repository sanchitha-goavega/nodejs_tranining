const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  dob: String,
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
