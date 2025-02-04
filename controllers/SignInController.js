const jwt=require('jsonwebtoken');
const jwtKey=process.env.JWT_SECRET;
const userModel=require("../model/Signin");


const signinPostController = async (req, res, next) => {
    const { Email, Password } = req.body;
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }
  
    try {
      const decoded = await jwt.verify(token, jwtKey);
      const user = await userModel.findOne({ Email });
  
      if (!user || user.Password !== Password) {
        return res.status(404).json({ exists: false, message: "Email is not registered" });
      }
  
      res.redirect("/Home");
      // res.json({ exists: true });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
const signupPostController=async (req,res,next)=>{
    const uname=req.body.Username;
    const pass=req.body.Password;
    const Email=req.body.Email;

    const user = await userModel.findOne({ Email: Email });
    const Newuser=new userModel({
        UserName:uname,
        Password:pass,
        Email:Email,
    });

    if(!user){
        const token =jwt.sign({Email:Email,pass:pass},jwtKey,{expiresIn:'200h'}); //jwt token created      
        Newuser.save().then(()=>{
            res.status(200).json({'token':token});
        }).catch((err)=>{
            console.log("Something went wrong",err);
            res.json({'message':err});
        })
    }
    else{
        res.status(403).json({"res":"User already exist"});
    }    
}


module.exports={
    signinPostController,
    signupPostController
}