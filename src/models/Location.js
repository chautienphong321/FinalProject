const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Location = new Schema({
  // workspace: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Workspace",
  // },
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
      const fromTime = new Date();
      fromTime.setHours(9, 0, 0, 0);
      return fromTime;
    },
  },
  to: {
    type: Date,
    default: function () {
      const toTime = new Date();
      toTime.setHours(10, 0, 0, 0);
      return toTime;
    },
  },
});

module.exports = mongoose.model("Location", Location);
