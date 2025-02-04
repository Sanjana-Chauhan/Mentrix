const jwt = require("jsonwebtoken");
const JwtVerification = (req, res, next) => {
  // Get the token from the request cookie
  console.log("Req cookies", req.cookies);
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.redirect("/signin");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.redirect("/signin");
  }
};
module.exports = JwtVerification;
