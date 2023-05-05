const Story = require("../models/storyModel");
const mongoose = require("mongoose");

const validateDevLogic = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid story ID" });
  }
  try {
    // check if user already add a section to that story.
    const storyAuthor = await Story.findById(id);
    if (!storyAuthor) {
      throw new Error("Story not found!");
    }
    if (
      storyAuthor.intro.author === req.user ||
      storyAuthor.development.author === req.user
    ) {
      return res
        .status(401)
        .json({ message: "You can only write one section to a story." });
    }

    // check if dev section exists.
    const story = await Story.findById(id).exists("development");
    if (story) {
      return res.json({ message: "There is a dev already" });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

module.exports = { validateDevLogic };
