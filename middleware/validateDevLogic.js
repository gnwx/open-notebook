const Story = require("../models/storyModel");
const mongoose = require("mongoose");

const validateDevLogic = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid story ID" });
  }
  const story = await Story.findById(id).exists("development");
  if (story) {
    return res.json({ message: "There is a dev already" });
  }
  return next();
};

module.exports = { validateDevLogic };
