const express = require("express");
const router = express.Router();

//middlewares

const { validateDevLogic } = require("../middleware/validateDevLogic");
const { validateConcLogic } = require("../middleware/validateConcLogic");
const { validateCreateStory } = require("../middleware/validateCreateStory");
const { validateBody } = require("../middleware/validateBody");
const auth = require("../middleware/checkAuth");

//functions
const {
  createStory,
  addDevelopment,
  addConclusion,
  getFinishedStories,
  getUnfinishedStories,
  getSingleStory,
} = require("../controllers/storyController");

//create new post || intro
router.post("/create", auth, validateCreateStory, createStory);

// add development to story || development
router.patch("/dev/:id", auth, validateDevLogic, validateBody, addDevelopment);

// add conclusion to story || conclusion
router.patch("/conc/:id", auth, validateConcLogic, validateBody, addConclusion);

//get all finished stories
router.get("/finished", getFinishedStories);

// // get all unfinished stories
router.get("/unfinished", getUnfinishedStories);

// get single story
router.get("/:id", getSingleStory);

module.exports = router;
