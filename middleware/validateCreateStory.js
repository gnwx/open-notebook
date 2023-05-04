const { body, validationResult } = require("express-validator");

const validateCreateStory = [
  body("title")
    .isLength({ min: 4 })
    .withMessage("Title must be at least 4 characters"),
  body("category")
    .isIn([
      "Fantasy",
      "Paranormal",
      "Horror",
      "Science Fiction",
      "Humor",
      "Poetry",
      "Tik Tok fiction",
      "Fiction",
    ])
    .withMessage("Invalid category"),
  body("body")
    .isLength({ min: 50 })
    .withMessage("Text must be greater than 50 characters.")
    .isLength({ max: 350 })
    .withMessage("Body must be at most 350 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreateStory };
