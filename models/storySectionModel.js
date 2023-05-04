const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySectionSchema = new Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["intro", "development", "conclusion"],
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StorySection", StorySectionSchema);
