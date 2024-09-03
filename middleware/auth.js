const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthenticated",
      data: "Unauthenticated",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthenticated",
        data: "Unauthenticated",
      });
    }

    try {
      const user = await User.findOne({ _id: decoded.id });
      console.log(user);
      if (!user) {
        return res.status(404).json({
          message: "No user found!!!",
          data: "Unauthenticated",
        });
      }
      res.locals.userData = user;
      return next();
    } catch (error) {
      console.log("verify token error", error);
      return res.status(500).json({
        message: "authInternalServerError",
        data: "Internal Server Error",
      });
    }
  });
};

module.exports = authMiddleware;
