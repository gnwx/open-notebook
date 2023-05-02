const express = require("express");
const cors= require("cors");
require("dotenv").config();



const app = express();
const port =  process.env.PORT  || 7000;

//middleware
app.use(cors());
app.use(express.json());



app.listen(port,()=>{
    console.log("Server is runnin on port",port)
})