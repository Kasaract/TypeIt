const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String
  });


module.exports = mongoose.model("Users", UsersSchema);