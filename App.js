const express = require("express");
const path = require("path");
const App = express();

const StudentRouter = require("./routers/StudentRouter"); //used to separate user student and mentor logic

const connectdb = require("./utils/mongodb");

App.use(express.urlencoded({extended:true}));  //Used for parsing the body
connectdb()// to connect the mentrix main db

App.use(express.static(path.join(__dirname, "public/")));

App.set("view engine", "ejs");
App.set("views", "views");

App.use(StudentRouter);


//to connect backend;
const PORT = 3000;

  App.listen(PORT, () => {
    console.log("server started on localhost:3000");
  })

 

