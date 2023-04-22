const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");

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
            Role.findOne({ _id: user.role }).then((role) => {
              if (role.name == "Admin") {
                req.isAdmin = true;
                console.log("is admin");
              }
            });
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
  if (req.user && req.user.role) {
    if (req.isAdmin === false) {
      User.findOne({ _id: req.user._id }).then((user) => {
        req.flash("error", "This page is for the admin.");
        req.flash("status", 409);
        return res.redirect("/notfound");
      });
    } else {
      next();
    }
  } else {
    req.flash("error", "You need to login first.");
    return res.redirect("/login");
  }
}

module.exports = { verifyToken, verifyAdmin };
