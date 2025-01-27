const jwt=require('jsonwebtoken');
const jwtKey=process.env.JWT_SECRET;
const userModel=require("../model/Signin");


const signinPostController=async(req,res,next)=>{
    const pass=req.body.Password;
    const mail=req.body.Email;   
    const token=req.headers.authorization;
   
    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }
    jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        try {
            const user = await userModel.findOne({ Email: mail });
           
            if (user && user.Password===pass) {
                res.status(200).json({"status":"Success"});
                return;
            } else {
                res.status(404).json({ exists: false, message: "Email is not registered" });
            }
        } catch (error) {
            console.error("Error checking email:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
}

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