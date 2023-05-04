const Story = require("../models/storyModel");
// Create a new story
const createStory = async (req, res) => {
  try {
    const { title, category, author, body } = req.body;

    const story = await Story.create({
      title,
      category,
      intro: { author, body },
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
    const dev = await Story.findByIdAndUpdate(id, {
      development: { author, body },
    });

    res.status(201).json({ message: "Development added to story", dev });
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

    if (!author || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    const conc = await Story.findByIdAndUpdate(id, {
      conclusion: { author, body },
    });

    res.status(201).json({ message: "Conclusion added to story", conc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//Retrieve all finished stories
const getFinishedStories = async (req, res) => {
  try {
    const stories = await Story.find().lean();

    res.status(200).json({ stories });
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
    res.json({ story });
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
