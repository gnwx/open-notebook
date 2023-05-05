const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id, username) => {
  return jwt.sign({ _id, username }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
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
    if (error.code === 11000) {
      return res
        .status(402)
        .json({
          succes: false,
          message: "A user already registered with this email!",
        });
    }
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id, user.username);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ succes: true, user: user.username });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
