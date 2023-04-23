const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Video = require("../models/Video");
const Gallery = require("../models/Gallery");
const Location = require("../models/Location");
const Type = require("../models/Type");
const Product = require("../models/Product");
const Customize = require("../models/Customize");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { mulToObject, toObject } = require("../utils/jsonToObject");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const paypal = require("paypal-rest-sdk");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../secrets/.env") });

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

  // [GET] /cart
  cart(req, res, next) {
    Promise.all([
      Product.find().populate("type"),
      Type.find(),
      Cart.findById(req.user.cart).populate("products.product"),
    ]).then(([products, types, cart]) => {
      var totalCart;
      var totalQuantity;
      if (!cart || !cart.products || cart.products.length == 0) {
        totalCart = 0;
        totalQuantity = 0;
      } else {
        totalCart = cart.products.reduce((total, item) => {
          const productTotal = item.product.price * item.quantity;
          return total + productTotal;
        }, 0);
        totalQuantity = cart.products.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      }
      res.render("cart", {
        user: toObject(req.user),
        isAdmin: req.isAdmin,
        title: "Shopping Cart",
        products: mulToObject(products),
        types: mulToObject(types),
        cart: toObject(cart),
        totalCart: totalCart,
        totalQuantity: totalQuantity,
      });
    });
  }

  // [GET] /shop/add-to-cart/:id
  addToCart(req, res, next) {
    try {
      const quantity = 1;
      const productId = req.params.productID;
      const product = Product.findById(productId);
      if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("back");
      }

      Cart.findOne({ _id: req.user.cart }).then((cart) => {
        const existingProductIndex = cart.products
          ? cart.products.findIndex(
              (p) => p.product && p.product.toString() === productId.toString()
            )
          : -1;
        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({ product: productId, quantity });
        }
        cart.total += product.price * quantity;
        cart.save().then(() => {
          req.flash("success", "Add to cart successfully");
          res.redirect("back");
        });
      });
    } catch (error) {
      req.flash("error", error.message);
      req.flash("status", error.status);
      return res.redirect("/notfound");
    }
  }

  // [GET] /remove-from-cart/:productID
  removeFromCart(req, res, next) {}

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

  // [POST] - /customize/store
  customizeStore(req, res, next) {
    var newCustom = new Customize(req.body);
    newCustom
      .save()
      .then(() => {
        req.flash("success", "Save Success!");
        return res.redirect("back");
      })
      .catch((err) => {
        req.flash("error", "Save fail!");
        return res.redirect("back");
      });
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
            const cart = new Cart();
            cart.save().then((cart) => {
              const user = new User({
                name: req.body.email.split("@")[0].trim(),
                role: "6442d2cc4ba91217916c3597", // ID of Customer Role
                password: hash,
                email: req.body.email,
                avatar: "sample-avatar.jpg",
                cart: cart._id,
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
          });
        }
      })
      .catch((err) => {
        req.flash("error", "Fail to register");
        return res.redirect("back");
      });
  }

  // [GET] - logout
  logout(req, res, next) {
    res.clearCookie("token");
    //req.logout();
    return res.redirect("/");
  }

  //[POST] /checkout-by-wallet
  checkoutByPaypal(req, res, next) {
    const PAYPAL_CILENT_ID = process.env.PAYPAL_CILENT_ID;
    const PAYPAL_CILENT_SECRET = process.env.PAYPAL_CILENT_SECRET;
    paypal.configure({
      mode: "sandbox",
      client_id: PAYPAL_CILENT_ID,
      client_secret: PAYPAL_CILENT_SECRET,
    });

    var totalOrder = 21000;

    var order = new Order({
      user: req.user._id,
      products: req.user.cart.products,
      total: totalOrder,
    });

    var orderParams = encodeURIComponent(JSON.stringify(order));

    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url:
          "http://localhost:1234/checkout-by-paypal-success?totalOrder=" +
          totalOrder +
          "&userId=" +
          req.user._id +
          "&order=" +
          orderParams +
          "&cartId=" +
          req.user.cart._id +
          "",
        cancel_url: "http://localhost:1234/checkout-error",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "2.0",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "2.0",
          },
          description: "Payment for Pontoon.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }

  //[POST] /check-out-by-paypal-success
  checkoutByPaypalSuccess(req, res) {
    const PAYPAL_CILENT_ID = process.env.PAYPAL_CILENT_ID;
    const PAYPAL_CILENT_SECRET = process.env.PAYPAL_CILENT_SECRET;
    paypal.configure({
      mode: "sandbox",
      client_id: PAYPAL_CILENT_ID,
      client_secret: PAYPAL_CILENT_SECRET,
    });

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "2.00",
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (err, payment) {
        if (err) {
          console.log("Paypal err: " + err);
        } else {
          var queryOrder = req.query.order;
          queryOrder = JSON.parse(queryOrder);
          var order = new Order(queryOrder);
          order.save();

          Cart.findOne({ _id: req.query.cartId })
            .then((cart) => {
              cart.products = [];
              cart.save().then(() => {
                req.flash("success", "Checkout successfully");
                return res.redirect("/cart");
              });
            })
            .catch((err) => {
              req.flash("error", "Checkout fail");
              return res.redirect("/cart");
            });
        }
      }
    );
  }

  //[POST] /checkout-error
  checkoutByPaypalError(req, res) {
    req.flash("failedMsg", "Your payment has been paused or canceled");
    return res.redirect("/cart");
  }
}

module.exports = new SiteController();
