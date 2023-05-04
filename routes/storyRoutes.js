const express = require("express");
const router = express.Router();
const {
  createStory,
  addDevelopment,
  addConclusion,
  getFinishedStories,
  getUnfinishedStories,
} = require("../controllers/storyController");

//create new post || intro
router.post("/create", createStory);

// add development to story || development
router.patch("/dev/:id", addDevelopment);

// add conclusion to story || conclusion
router.patch("/conc/:id", addConclusion);

//get all finished stories
// router.get("/finished", getFinishedStories);

// // get all unfinished stories
// router.get("/unfinished", getUnfinishedStories);

// get single post
// router.get("/:id",getStory);

module.exports = router;
