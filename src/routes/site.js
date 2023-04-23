const siteController = require("../controllers/SiteController");
const User = require("../models/User");

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { verifyToken } = require("../utils/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.resolve(__dirname, "../secrets/.env") });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1234/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleID: profile.id }).then((err, user) => {
        if (user) {
          return done(null, profile);
        } else {
          var newUser = new User({
            email: profile.email,
            name: profile.displayName,
            googleID: profile.id,
            avatar: profile.photos[0].value,
            role: "6442d2cc4ba91217916c3597",
          });
          newUser
            .save()
            .then(() => {
              return done(null, newUser);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// [GET] /auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
// [GET] /auth/google/callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    var token = jwt.sign({ _id: req.user.id }, "secretpasstoken", {});
    res.cookie("token", token);
    res.redirect("/");
  }
);

// [GET] /shop
router.get("/shop", siteController.shop);

// [POST] /store
router.post("/store", siteController.store);

// [POST] /validate
router.post("/validate", siteController.validate);

// [GET] /login
router.get("/login", siteController.login);

// [GET] /register
router.get("/register", siteController.register);

// [GET] /logout
router.get("/logout", siteController.logout);

// [POST] /customize
router.post("/customize/store", siteController.customizeStore);
// [GET] /customize
router.get("/customize", verifyToken, siteController.customize);

//[GET] /error/:slug
router.use("/:slug", verifyToken, siteController.error);

// [GET] /index
router.get("/", verifyToken, siteController.index);

module.exports = router;
