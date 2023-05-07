const Story = require("../models/storyModel");

// Create a new story
const createStory = async (req, res) => {
  try {
    const { title, category, body } = req.body;
    console.log(req.user);
    const story = await Story.create({
      title,
      category,
      intro: { author: req.user, body },
    });
    res
      .status(201)
      .json({ success: true, message: "Story created successfully" });
  } catch (error) {
    console.error(error);

    // handle title from schema validation: title=unique
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Title must be unique!" });
    }
    res.json({ success: false, error: error.message });
  }
};

// Add development to a story
const addDevelopment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    await Story.findByIdAndUpdate(id, {
      development: { author: req.user, body },
    });

    res
      .status(201)
      .json({ success: true, message: "Development added to story" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add conclusion to a story
const addConclusion = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const story = await Story.findById(id);

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }
    await Story.findByIdAndUpdate(id, {
      conclusion: { author: req.user, body },
    });

    res
      .status(201)
      .json({ success: true, message: "Conclusion added to story" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//Retrieve all finished stories
const getFinishedStories = async (req, res) => {
  try {
    const stories = await Story.find({
      intro: { $exists: true },
      development: { $exists: true },
      conclusion: { $exists: true },
    })
      .lean()
      .orFail(new Error("There are no finished stories!"));

    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Retrieve all unfinished stories

const getUnfinishedStories = async (req, res) => {
  try {
    const unfinishedStories = await Story.find({
      conclusion: { $exists: false },
    })
      .lean()
      .orFail(new Error("There are no unfinished stories!"));
    res.status(200).json({ success: true, unfinishedStories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      throw new Error("Story couldn't find!");
    }
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createStory,
  addDevelopment,
  addConclusion,
  getFinishedStories,
  getUnfinishedStories,
  getSingleStory,
};
