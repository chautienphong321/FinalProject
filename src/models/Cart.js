const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Cart", Cart);
