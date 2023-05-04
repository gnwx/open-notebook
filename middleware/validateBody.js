const { body, validationResult } = require("express-validator");

const validateBody = [
  body("body")
    .isLength({ min: 50 })
    .withMessage("Text must be greater than 50 characters.")
    .isLength({ max: 350 })
    .withMessage("Text must not exceed 350 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateBody };
