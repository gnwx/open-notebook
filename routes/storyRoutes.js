const express = require("express");
const { validateDevSection } = require("../middleware/validateDevSection");
const { validateConcSection } = require("../middleware/validateConcSection");
const router = express.Router();
const {
  createStory,
  addDevelopment,
  addConclusion,
  getFinishedStories,
  getUnfinishedStories,
  getSingleStory,
} = require("../controllers/storyController");

//create new post || intro
router.post("/create", createStory);

// add development to story || development
router.patch("/dev/:id", validateDevSection, addDevelopment);

// add conclusion to story || conclusion
router.patch("/conc/:id", validateConcSection, addConclusion);

//get all finished stories
router.get("/finished", getFinishedStories);

// // get all unfinished stories
// router.get("/unfinished", getUnfinishedStories);

// get single story
router.get("/:id", getSingleStory);

module.exports = router;
