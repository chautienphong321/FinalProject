const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const mongooseDelete = require("mongoose-delete");
// const findOrCreate = require("mongoose-findorcreate");
// const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const User = new mongoose.Schema(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    name: { type: String, minLength: 1, maxLength: 255 },
    email: { type: String, minLength: 1, maxLength: 255 },
    password: { type: String },
    avatar: { type: String, maxLength: 255, default: "sample-avatar.jpg" },

    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],

    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    googleID: { type: String },

    countFailed: { type: Number, default: 0 },
    deletedAt: {},
  },
  {
    timestamps: true,
  }
);

//Add plugin
// User.plugin(mongooseDelete, {
//   overrideMethods: "all",
//   deletedAt: true,
// });
mongoose.plugin(slug);
// mongoose.plugin(findOrCreate);
// mongoose.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
