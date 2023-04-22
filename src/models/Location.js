const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Location = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(9, 0, 0, 0);
      return now;
    },
  },
  to: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(10, 0, 0, 0);
      return now;
    },
  },
});

module.exports = mongoose.model("Location", Location);
