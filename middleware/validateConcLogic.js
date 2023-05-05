const mongoose = require("mongoose");

const Story = require("../models/storyModel");

const validateConcLogic = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid story ID" });
  }
  try {
    const alreadyAuthor = await Story.findById(id);
    if (
      alreadyAuthor.intro.author === req.user ||
      alreadyAuthor.development.author === req.user
    ) {
      return res
        .status(401)
        .json({ message: "You can only write one section to a story." });
    }

    const story = await Story.findById(id).exists("conclusion");
    if (story) {
      return res.json({ message: "There is already a conclusion!" });
    }

    return next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { validateConcLogic };
