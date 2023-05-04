const StorySection = require("../models/storySectionModel");

const validateDevLogic = async (req, res, next) => {
  const { id } = req.params;
  const noIntro = await StorySection.findOne({
    storyId: id,
    type: "intro",
  });

  if (!noIntro) {
    return res.json({
      message: "You can't add an development to a story that has no intro.",
    });
  }
  const dev = await StorySection.findOne({ storyId: id, type: "development" });
  if (dev) {
    return res.json({
      message: "There is already a development section for this story",
    });
  }
  next();
};

module.exports = { validateDevLogic };
