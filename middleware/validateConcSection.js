const StorySection = require("../models/storySectionModel");

const validateConcSection = async (req, res, next) => {
  const { id } = req.params;
  const noDev = await StorySection.findOne({
    storyId: id,
    type: "development",
  });

  if (!noDev) {
    return res.json({
      message: "You can't add an ending to a story that has no development.",
    });
  }
  const conclusion = await StorySection.findOne({
    storyId: id,
    type: "conclusion",
  });
  if (conclusion) {
    return res.json({
      message: "There is already a conclusion section for this story",
    });
  }
  next();
};

module.exports = { validateConcSection };
