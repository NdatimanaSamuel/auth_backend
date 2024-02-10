const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from headers
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //GET uSER fROM TOKEN
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {

     return res.status(401).json({ message: "Not Authorized" });
    }
  }
    if (!token) {
        return res.status(401).json({message:"Not Authorized,No Token"})
  }
};

module.exports = { protect };
