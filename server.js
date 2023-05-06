const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const storyRoutes = require("./routes/storyRoutes");
const userRoutes = require("./routes/userRoutes");

const connectDB = require("./db");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 7000;
const orig = process.env.CORS;
//middleware
app.use(
  cors({
    origin: orig,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// for method log
app.use((req, res, next) => {
  console.log(req, req.path, req.method);
  next();
});
// user routes
app.use("/api/user", userRoutes);

// story routes
app.use("/api/stories", storyRoutes);

// connect to database
connectDB();

app.listen(port, () => {
  console.log("Server is runnin on port", port);
});
