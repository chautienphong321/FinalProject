const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Carousel = new Schema({
  imageOne: {
    type: String,
    required: true,
  },
  imageTwo: {
    type: String,
    required: true,
  },
  imageThree: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Carousel", Carousel);
