const express = require("express");
const cors= require("cors");
require("dotenv").config();
const connectDB = require("./db");



const app = express();
const port =  process.env.PORT  || 7000;

//middleware
app.use(cors());
app.use(express.json());

// for method log
app.use((req,res,next)=>{
    console.log(req,path,req.method)
    next();
})
// user routes
// app.use("/api/user",userRoutes);

// story routes
// app.use("/api/stories",storyRoutes)
// connect to database
connectDB();

app.listen(port,()=>{
    console.log("Server is runnin on port",port)
})