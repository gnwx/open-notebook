const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Romance",
      "Fantasy",
      "Paranormal",
      "Horror",
      "Science Fiction",
      "Humor",
      "Poetry",
      "Social media ",
      "Fiction",
    ],
    required: true,
  },
});

module.exports = mongoose.model("Story", StorySchema);
