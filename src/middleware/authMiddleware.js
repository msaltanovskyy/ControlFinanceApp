
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/User'); // Import user model Import user model

const protect = asyncHandler(async (req, res, next) => {
  
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
    try {
      // get token from header
        token = req.headers.authorization.split(" ")[1];

      // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized");
    }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
});

const roleIsAdmin = () => {
  return (req, res, next) => {
      if (req.user && req.user.isAdmin) {
          next(); // Пользователь является администратором
      } else {
          res.status(403); // Forbidden
          throw new Error("Not authorized as an admin");
      }
  };
};

module.exports = { protect, roleIsAdmin };