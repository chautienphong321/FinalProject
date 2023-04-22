const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Workspace = new Schema(
  {
    carousel: {
      type: Schema.Types.ObjectId,
      ref: "Carousel",
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    gallery: {
      type: Schema.Types.ObjectId,
      ref: "Gallery",
      required: true,
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Workspace", Workspace);
