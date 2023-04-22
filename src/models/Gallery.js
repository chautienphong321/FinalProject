const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Gallery = new Schema({
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
  imageFour: {
    type: String,
    required: true,
  },
  imageFive: {
    type: String,
    required: true,
  },
  imageSix: {
    type: String,
    required: true,
  },
  imageSeven: {
    type: String,
    required: true,
  },
  imageEight: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gallery", Gallery);
