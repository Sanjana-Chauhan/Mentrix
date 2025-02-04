const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const App = express();
dotenv.config(); //To access the environment variables.
const StudentRouter = require("./routers/StudentRouter"); //used to separate user student and mentor logic

const connectdb = require("./utils/mongodb");
App.use(express.json());
App.use(express.urlencoded({ extended: true })); //Used for parsing the body
App.use(cookieParser()); // Used for parsing the cookies
connectdb(); // to connect the mentrix main db

App.use(express.static(path.join(__dirname, "public/")));

App.set("view engine", "ejs");
App.set("views", "views");

App.use(StudentRouter);

//to connect backend;
const PORT = 4000;

App.listen(PORT, () => {
  console.log("server started on localhost:" + PORT);
});
