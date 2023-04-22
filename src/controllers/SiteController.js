const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Video = require("../models/Video");
const Gallery = require("../models/Gallery");
const Location = require("../models/Location");
const Type = require("../models/Type");
const Product = require("../models/Product");
const { mulToObject, toObject } = require("../utils/jsonToObject");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class SiteController {
  // [GET] - Index
  index(req, res, next) {
    Promise.all([
      Carousel.find(),
      Video.find(),
      Gallery.find(),
      Location.find(),
    ]).then(([carousel, video, gallery, locations]) => {
      let filterDistricts = [];
      locations.forEach((location) => {
        let districtObj = { district: location.district };
        if (
          !filterDistricts.some(
            (item) => item.district === districtObj.district
          )
        ) {
          filterDistricts.push(districtObj);
        }
      });
      return res.render("home", {
        isHomePage: true,
        user: toObject(req.user),
        isAdmin: req.isAdmin,
        carousel: toObject(carousel[0]),
        video: toObject(video[0]),
        gallery: toObject(gallery[0]),
        locations: mulToObject(locations),
        filterDistricts,
      });
    });
  }

  // [GET] /shop
  shop(req, res, next) {
    Promise.all([Product.find().populate("type"), Type.find()]).then(
      ([products, types]) => {
        res.render("shop", {
          user: toObject(req.user),
          isAdmin: req.isAdmin,
          title: "Shop",
          products: mulToObject(products),
          types: mulToObject(types),
        });
      }
    );
  }

  // [GET] - Error
  error(req, res, next) {
    return res.render("partials/notfound", {
      layout: null,
      title: "404 Not Found",
    });
  }

  // [GET] - login
  login(req, res, next) {
    if (req.cookies && req.cookies.token) {
      return res.redirect("/");
    }
    return res.render("login", { isLoginPage: true, title: "Login" });
  }

  // [GET] - register
  register(req, res, next) {
    if (req.cookies && req.cookies.token) {
      return res.redirect("/");
    }
    return res.render("register", { title: "Register" });
  }

  // [GET] - customize
  customize(req, res, next) {
    return res.render("customize", {
      isCustomizePage: true,
      title: "Customize",
      user: toObject(req.user),
      isAdmin: req.isAdmin,
    });
  }

  // [POST] - validate
  validate(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          req.flash("error", "Wrong email");
          return res.redirect("/login");
        }
        //kiểm tra nếu count = 10 thì là đang khoá tạm thời
        if (user.countFailed == 10) {
          req.flash(
            "error",
            "Account is temporarily locked, please try again in 1 minute"
          );
          return res.redirect("/login");
        }
        //kiểm tra nếu count = 10 thì là đang khoá tạm thời
        if (user.countFailed == 6) {
          req.flash("error", "Account has been permanently locked");
          return res.redirect("/login");
        }
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              var token = jwt.sign({ _id: user._id }, "secretpasstoken", {});
              User.updateOne({ email: email }, { $set: { countFailed: 0 } })
                .then(() => {
                  res.cookie("token", token, {
                    maxAge: 2147483647,
                    httpOnly: true,
                  });
                  return res.redirect("back");
                })
                .catch((err) => {
                  req.flash("error", "There is an error with your login");
                  return res.redirect("/login");
                });
            } else {
              const failed = user.countFailed;
              if (failed == 2) {
                //Khoá tạm thời set count = 10
                User.updateOne({ email: email }, { $set: { countFailed: 10 } })
                  .then(() => {
                    //Mở khoá tài khoản sau 1 phút, trả count về 3
                    var lockAccountOneMinute = setTimeout(function () {
                      User.updateOne(
                        { email: email },
                        { $set: { countFailed: 3 } }
                      )
                        .then(() => {
                          req.flash(
                            "success",
                            "Account unlocked after 1 minute"
                          );
                        })
                        .catch((err) => {
                          req.flash(
                            "error",
                            "There is an error with your login"
                          );
                        });
                    }, 60000);
                    req.flash("error", "Account has been locked for 1 minute");
                    return res.redirect("/login");
                  })
                  .catch((err) => {
                    req.flash("error", "There is an error with your login");
                    return res.redirect("/login");
                  });
              } else if (failed >= 5) {
                User.updateOne({ email: email }, { $set: { countFailed: 6 } })
                  .then(() => {
                    req.flash("error", "Account has been permanently locked");
                    return res.redirect("/login");
                  })
                  .catch((err) => {
                    req.flash("error", "There is an error with your login");
                    return res.redirect("/login");
                  });
              } else {
                User.updateOne(
                  { email: email },
                  { $set: { countFailed: failed + 1 } }
                )
                  .then(() => {
                    req.flash("error", "Wrong password");
                    return res.redirect("/login");
                  })
                  .catch((err) => {
                    req.flash("error", "There is an error with your login");
                    return res.redirect("/login");
                  });
              }
            }
          })
          .catch((err) => {
            req.flash("error", "There is an error with your login");
            return res.redirect("/login");
          });
      })
      .catch((err) => {
        if (err) {
          req.flash("error", "There is an error with your login");
          return res.redirect("/login");
        }
      });
  }

  // [POST] - store
  store(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (data != null) {
          req.flash("error", "Email or phone is already registered");
          return res.redirect("/register");
        } else {
          var temp = req.body.password;
          bcrypt.hash(temp, 10, function (err, hash) {
            const user = new User({
              name: req.body.email.split("@")[0].trim(),
              role: "6442d2cc4ba91217916c3597", // ID of Customer Role
              password: hash,
              email: req.body.email,
              avatar: "sample-avatar.jpg",
            });
            user
              .save()
              .then(() => {
                req.flash(
                  "success",
                  "Registration successful! You can now login."
                );
                req.flash("email", req.body.email);
                return res.redirect("/login");
              })
              .catch((err) => {
                req.flash("error", "Fail to register");
                return res.redirect("/register");
              });
          });
        }
      })
      .catch((err) => console.log(err));
  }

  // [GET] - logout
  logout(req, res, next) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}

module.exports = new SiteController();
