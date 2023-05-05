const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const {
  validateUserRegistration,
} = require("../middleware/validateRegistiration");
const { validateUserLogin } = require("../middleware/validateLogin");
router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);

module.exports = router;
