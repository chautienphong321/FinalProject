const { mulToObject, toObject } = require("../utils/jsonToObject");

class AdminController {
  // [GET] - Index
  index(req, res, next) {
    return res.render("admin", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Dashboard",
    });
  }

  // [GET] - Products
  product(req, res, next) {
    return res.render("admin/products", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Products",
    });
  }

  // [GET] - Carousel
  carousel(req, res, next) {
    return res.render("admin/products", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Products",
    });
  }
}

module.exports = new AdminController();
