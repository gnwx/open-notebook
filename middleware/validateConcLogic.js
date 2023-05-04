const mongoose = require("mongoose");

const Story = require("../models/storyModel");

const validateConcLogic = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid story ID" });
  }

  const story = await Story.findById(id).exists("conclusion");
  if (story) {
    return res.json({ message: "There is already a conclusion!" });
  }

  return next();
};

module.exports = { validateConcLogic };
