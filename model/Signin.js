const mongoose=require('mongoose');

const schema= new mongoose.Schema({
    UserName:String,
    Password:String,
    Email:String
});

const model= mongoose.model("UserData",schema);

module.exports=model;