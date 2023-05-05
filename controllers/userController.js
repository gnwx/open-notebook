const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const ifExists = await User.findOne({ username });
    if (ifExists) {
      return res
        .status(409)
        .json({ message: "With that username a user already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });

    res
      .status(201)
      .json({ succes: true, message: "User created succesfully!", user: user });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id);
      res.json({ token: token, user: user.username });
    } else {
      res.json({ succes: false, message: "Wrong username or password " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
