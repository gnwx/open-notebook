const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  authenticateUser,
} = require("../controllers/userController");
const {
  validateUserRegistration,
} = require("../middleware/validateRegistiration");
const { validateUserLogin } = require("../middleware/validateLogin");

//routes

router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.get("/auth", authenticateUser);
module.exports = router;
