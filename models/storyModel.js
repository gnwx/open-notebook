const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: [
        "Fantasy",
        "Paranormal",
        "Horror",
        "Science Fiction",
        "Humor",
        "Poetry",
        "Tik Tok fiction",
        "Fiction",
      ],
      required: true,
    },
    intro: {
      author: {
        type: String,
      },
      body: {
        type: String,
      },
    },
    development: {
      author: {
        type: String,
      },
      body: {
        type: String,
      },
    },
    conclusion: {
      author: {
        type: String,
      },
      body: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
