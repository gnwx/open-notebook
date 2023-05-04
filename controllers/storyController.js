const Story = require("../models/storyModel");
const StorySection = require("../models/storySectionModel");

// Create a new story
const createStory = async (req, res) => {
  try {
    const { title, category, author, body } = req.body;

    if (!title || !category || !author || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // add category validation.
    const story = await Story.create({ title, category });

    await StorySection.create({
      storyId: story._id,
      author,
      type: "intro",
      body,
    });

    res
      .status(201)
      .json({ message: "Story created successfully", story: story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add development to a story
const addDevelopment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, body } = req.body;

    if (!author || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    await StorySection.create({
      storyId: story._id,
      author,
      type: "development",
      body,
    });

    res.status(201).json({ message: "Development added to story" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add conclusion to a story
const addConclusion = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, body } = req.body;

    // Validate input fields
    if (!author || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the story document
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Create a new section document for the conclusion
    await StorySection.create({
      storyId: story._id,
      author,
      type: "conclusion",
      body,
    });

    res.status(201).json({ message: "Conclusion added to story" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Retrieve all finished stories
// const getFinishedStories = async (req, res) => {
//   try {
//     const stories = await Story.find({
//       intro: { $exists: true },
//       development: { $exists: true },
//       conclusion: { $exists: true },
//     })
//       .lean()
//       .exec();

//     res.json({ stories: stories });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Retrieve all unfinished stories

// const getUnfinishedStories = async (req, res) => {
//   try {

//     res.json({ stories });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  createStory,
  addDevelopment,
  addConclusion,
  // getFinishedStories,
  // getUnfinishedStories,
};
