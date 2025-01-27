const express=require("express");
const { signinPostController ,signupPostController }=require('../controllers/SignInController');
const StudentRouter= express.Router();


//SignIn Handling
StudentRouter.post("/SignIn",signinPostController);
StudentRouter.get("/SignIn",(req,res,next)=>{
    res.render("signin.ejs",{Formtype:"signin"}) 
})

// Signup handling
StudentRouter.post("/signup",signupPostController)
StudentRouter.get("/signup",(req,res,next)=>{
    res.render("signin.ejs",{Formtype:"signup"}) 
})

StudentRouter.get("/Home",(req,res,next)=>{
    res.render("index.ejs") 
})

StudentRouter.get("/Mentors",(req,res,next)=>{
    res.render("Mentors.ejs") 
})

StudentRouter.get("/Courses",(req,res,next)=>{
    res.render("Courses.ejs") 
})

StudentRouter.get("/Aboutus",(req,res,next)=>{
    res.render("Aboutus.ejs") 
})

StudentRouter.use("/",(req,res,next)=>{
    res.render("signin.ejs",{Formtype:"signin"}) 
})


module.exports=StudentRouter;