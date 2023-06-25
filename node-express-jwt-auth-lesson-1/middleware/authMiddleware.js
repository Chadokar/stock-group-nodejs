const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //   check json web token exist and is verified
  if (token) {
    jwt.verify(token, "chadokar", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// const a = 0;
// check current user
const checkUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, "chadokar", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json(err);
      } else {
        console.log("decodedToken: ", decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const verifyToken = (req, res, next) => {
  const token = JSON.parse(req.headers.authorization);
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    try {
      const decoded = jwt.verify(token, "chadokar");
      req.id = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({
        message: err,
      });
    }
  }
};

module.exports = { requireAuth, checkUser, verifyToken };
