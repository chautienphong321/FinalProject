const jwt = require("jsonwebtoken");

const User = require("../models/User");

function verifyToken(req, res, next) {
  var token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (token !== undefined && token !== null) {
    try {
      const decoded = jwt.verify(token, "secretpasstoken");
      User.findOne({ _id: decoded._id })
        .then((user) => {
          if (user) {
            if (user.role == "Admin") {
              req.isAdmin = true;
            }
            req.user = user;
          }
          next(); // always call next() here to ensure middleware chain continues
        })
        .catch((err) => {
          req.flash("error", "You need to login first.");
          return res.redirect("/login");
        });
    } catch (err) {
      req.flash("error", "You need to login first.");
      return res.redirect("/login");
    }
  } else {
    req.user = null;
    req.isAdmin = false;
    next();
  }
}

function verifyAdmin(req, res, next) {
  console.log(req.user);
  if (req.user && req.user.role) {
    console.log("Verifying admin 1");

    if (req.user.role != "Admin") {
      console.log("Verifying admin 2");

      User.findOne({ _id: req.user._id }).then((user) => {
        console.log("Verifying admin 3");

        req.flash("error", "This page is for the admin.");
        req.flash("status", 409);
        return res.redirect("/notfound");
      });
    } else {
      // call next() here only if user is an admin
      console.log("User is an admin");
      next();
    }
  } else {
    console.log("Verifying admin fail");

    req.flash("error", "You need to login first.");
    return res.redirect("/login");
  }
}

module.exports = { verifyToken, verifyAdmin };
