const { mulToObject, toObject } = require("../utils/jsonToObject");
const Role = require("../models/Role");
const Carousel = require("../models/Carousel");
const Video = require("../models/Video");
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
      tab: "Tables",
    });
  }

  // [GET] - Carousel
  carousel(req, res, next) {
    Carousel.find().then((carousel) => {
      return res.render("admin/carousel", {
        layout: "adminLayout",
        user: toObject(req.user),
        title: "Carousel",
        tab: "Customize",
        carousel: toObject(carousel[0]),
      });
    });
  }
  // [POST] - /carousel/store
  carouselStore(req, res, next) {
    var newCarousel = new Carousel(req.body);
    Carousel.collection.drop(function (err, result) {
      if (err) {
        req.flash("error", "Save fail!");
        return res.redirect("back");
      } else {
        newCarousel
          .save()
          .then(() => {
            req.flash("success", "Save succesful!");
            return res.redirect("back");
          })
          .catch((err) => {
            req.flash("error", "Save fail!");
            return res.redirect("back");
          });
      }
    });
  }

  // [GET] - video
  video(req, res, next) {
    Video.find().then((video) => {
      return res.render("admin/video", {
        layout: "adminLayout",
        user: toObject(req.user),
        title: "Video",
        tab: "Customize",
        video: mulToObject(video),
      });
    });
  }
  // [POST] - /video/store
  videoStore(req, res, next) {
    var newVideo = new Video(req.body);
    Video.collection.drop(function (err, result) {
      if (err) {
        req.flash("error", "Save fail!");
        return res.redirect("back");
      } else {
        newVideo
          .save()
          .then(() => {
            req.flash("success", "Save succesful!");
            return res.redirect("back");
          })
          .catch((err) => {
            req.flash("error", "Save fail!");
            return res.redirect("back");
          });
      }
    });
  }

  // [GET] - gallery
  gallery(req, res, next) {
    return res.render("admin/gallery", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Gallery",
      tab: "Customize",
    });
  }

  // [GET] - location
  location(req, res, next) {
    return res.render("admin/location", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Location",
      tab: "Customize",
    });
  }
}

module.exports = new AdminController();
