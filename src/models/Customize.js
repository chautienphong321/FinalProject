const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customize = new Schema({
  kinds: {
    type: String,
    required: true,
    default: "shirt",
  },
  colour: {
    type: String,
    required: true,
    default: "black",
  },
  pattern: {
    type: String,
    required: true,
    default: null,
  },
  patternColour: {
    type: String,
    default: "white",
  },
  patternPosition: {
    type: String,
    default: "topright",
  },
});

module.exports = mongoose.model("Customize", Customize);
