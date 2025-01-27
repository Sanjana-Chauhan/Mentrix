const mongoose = require("mongoose");

uri =
  "mongodb+srv://Sanjana:sanjana@cluster0.bd5mh.mongodb.net/MentrrixMain?retryWrites=true&w=majority&appName=Cluster0";
const connectdb = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Database connected Successfully!");
    })
    .catch((err) => {
      console.log("Some Issue in connecting with DataBase. Check Your Internet Connection");
      console.log("ERROR :",err);
    });
};

module.exports = connectdb;
//Schema and model are in model/signin

//Save logic in app.js
