const jwt=require('jsonwebtoken');
const JwtVerification = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.user = decoded;
        next();     
    } catch (error) {        
        console.log(error);
        return res.status(403).json({ message: "Invalid token" });
    }
};
module.exports = JwtVerification    ;