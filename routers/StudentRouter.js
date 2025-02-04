const express=require("express");
const { signinPostController ,signupPostController }=require('../controllers/SignInController');
const PageNotFoundController=require("../controllers/PageNotFound");
const StudentRouter= express.Router();
const JwtVerification =require("../middlewares/jwtVerification");

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

StudentRouter.get("/Home",JwtVerification,(req,res,next)=>{
    console.log(req.user);
    res.render("index.ejs") ;
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

StudentRouter.get("/LogOut",(req,res,next)=>{
    res.redirect("/SignIn") 
})
StudentRouter.use("/",(req,res,next)=>{
    res.render("signin.ejs",{Formtype:"signup"}) 
})


module.exports=StudentRouter;