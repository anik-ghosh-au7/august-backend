const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  Post_Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Time: {
    type: Date,
    default: Date.now,
  },
  Comments: [String],
});

module.exports = mongoose.model("post", postSchema, "post_list");
