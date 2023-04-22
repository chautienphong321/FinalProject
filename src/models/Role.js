const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Role = new Schema({
  name: {
    type: String,
    enum: ["Customer", "Admin"],
    default: "Customer",
  },
});

module.exports = mongoose.model("Role", Role);
