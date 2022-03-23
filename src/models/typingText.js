const mongoose = require("mongoose");

const TypingTextSchema = new mongoose.Schema({
    language: String,
    texts: [String],
  });


module.exports = mongoose.model("TypingText", TypingTextSchema);