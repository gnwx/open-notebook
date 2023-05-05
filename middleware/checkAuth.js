const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = username;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = verifyToken;
