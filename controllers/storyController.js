const Story = require("../models/storyModel");
const StorySection = require("../models/storySectionModel");
// Create a new story
const createStory = async (req, res) => {
  try {
    const { title, category, author, body } = req.body;

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

    if (error.code === 11000) {
      return res.status(400).json({ message: "Title must be unique!" });
    }
    res.json({ error });
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
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
};

//Retrieve all finished stories
const getFinishedStories = async (req, res) => {
  try {
    const stories = await Story.find().lean();
    const finishedStories = [];
    for (const story of stories) {
      const { _id } = story;
      const numIntroSections = await StorySection.countDocuments({
        storyId: _id,
        type: "intro",
      });
      const numDevelopmentSections = await StorySection.countDocuments({
        storyId: _id,
        type: "development",
      });
      const numConclusionSections = await StorySection.countDocuments({
        storyId: _id,
        type: "conclusion",
      });

      if (
        numIntroSections === 1 &&
        numDevelopmentSections >= 1 &&
        numConclusionSections === 1
      ) {
        const sections = await StorySection.find({ storyId: _id }).lean();

        finishedStories.push({ ...story, sections });
      }
    }
    res.status(200).json({ finishedStories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Retrieve all unfinished stories

// const getUnfinishedStories = async (req, res) => {
//   try {

//     res.json({ stories });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getSingleStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      throw new Error("Story couldn't find!");
    }
    const sections = await StorySection.find({ storyId: id });
    const storyWithSections = { ...story._doc, sections };
    res.json({ storyWithSections });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createStory,
  addDevelopment,
  addConclusion,
  getFinishedStories,
  // getUnfinishedStories,
  getSingleStory,
};
