const { body, validationResult } = require("express-validator");

const validateUserRegistration = [
  body("username")
    .isLength({ min: 3, max: 35 })
    .withMessage("Username must be at least 3 characters long. Max:35"),
  body("email").isEmail().withMessage("Email must be a valid email address."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUserRegistration };
