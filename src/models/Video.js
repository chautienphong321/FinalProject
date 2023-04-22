const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Video = new Schema({
  imageVideo: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Video", Video);
