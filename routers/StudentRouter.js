const express=require("express");
const userModel=require("../model/Signin");

const StudentRouter= express.Router();

StudentRouter.get("/SignIn",(req,res,next)=>{
    res.render("signin.ejs",{Formtype:"signin"}) 
})

StudentRouter.post("/SignIn",async(req,res,next)=>{
    const pass=req.body.Password;
    const mail=req.body.Email;   
        try {
            const user = await userModel.findOne({ Email: mail });
           
            if (user && user.Password===pass) {
                res.status(200).redirect("/Home")
            } else {
                res.status(404).json({ exists: false, message: "Email is not registered" });
            }
        } catch (error) {
            console.error("Error checking email:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
});


StudentRouter.post("/signup",(req,res,next)=>{

    //Write all this code in controller and do proper validation and sanitization of the input
    const uname=req.body.Username;
    const pass=req.body.Password;
    const Email=req.body.Email;
    const Newuser=new userModel({
        UserName:uname,
        Password:pass,
        Email:Email,
    });

    if(uname!=="" && pass!=="" && Email!==""){
        Newuser.save().then(()=>{
            console.log("Signin Successfull");
            res.status(200).redirect("/Home");
        }).catch((err)=>{
            console.log("Something went wrong",err);
        })
    }
    else{
        res.json({"msg":"All fields are mandatory"});
    }

   

    
})


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