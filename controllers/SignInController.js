const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const userModel = require("../model/Signin");

// Login User
const signinPostController = async (req, res, next) => {
  const { Email, Password } = req.body;

  // Check if the email and password are provided
  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await userModel.findOne({ Email });

    if (!user || user.Password !== Password) {
      return res
        .status(404)
        .json({ exists: false, message: "Email is not registered" });
    }

    // Create a JWT token
    const token = jwt.sign({ Email, Password }, jwtKey, {
      expiresIn: "200h", // expires in 200 hours
    });

    // Instead of localStorage, we will use cookies to store the token
    // Why? Because cookies are more secure than localStorage
    // And also, cookies are sent to the server with every request
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript (XSS protection)
      secure: false, // Set to true if your using https
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 3600000, // Expires in 1 hour
    });

    res.status(200).json({ exists: true, token: token }); // Send the token to the client/frontend
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register a new user
const signupPostController = async (req, res, next) => {
  const uname = req.body.Username;
  const pass = req.body.Password;
  const Email = req.body.Email;

  const user = await userModel.findOne({ Email: Email });
  const Newuser = new userModel({
    UserName: uname,
    Password: pass,
    Email: Email,
  });

  if (!user) {
    const token = jwt.sign({ Email: Email, pass: pass }, jwtKey, {
      expiresIn: "200h",
    }); //jwt token created
    Newuser.save()
      .then(() => {
        // Instead of localStorage, we will use cookies to store the token
        // Why? Because cookies are more secure than localStorage
        // And also, cookies are sent to the server with every request
        res.cookie("token", token, {
          httpOnly: true, // Prevents access via JavaScript (XSS protection)
          secure: false, // Set to true if your using https
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 3600000, // Expires in 1 hour
        });
        res.status(200).json({ token: token });
      })
      .catch((err) => {
        console.log("Something went wrong", err);
        res.json({ message: err.message });
      });
  } else {
    res.status(403).json({ message: "User already exist" });
  }
};

module.exports = {
  signinPostController,
  signupPostController,
};
