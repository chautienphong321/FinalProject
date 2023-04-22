const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Product", Product);
