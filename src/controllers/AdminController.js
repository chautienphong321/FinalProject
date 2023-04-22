const { mulToObject, toObject } = require("../utils/jsonToObject");
const Role = require("../models/Role");
const Carousel = require("../models/Carousel");
const Video = require("../models/Video");
const Gallery = require("../models/Gallery");
const Location = require("../models/Location");
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
    Gallery.find().then((gallery) => {
      return res.render("admin/gallery", {
        layout: "adminLayout",
        user: toObject(req.user),
        title: "Gallery",
        tab: "Customize",
        gallery: toObject(gallery[0]),
      });
    });
  }
  // [POST] - /gallery/store
  galleryStore(req, res, next) {
    var newGallery = new Gallery(req.body);
    Gallery.collection.drop(function (err, result) {
      if (err) {
        req.flash("error", "Save fail!");
        return res.redirect("back");
      } else {
        newGallery
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

  // [GET] - location
  location(req, res, next) {
    return res.render("admin/location", {
      layout: "adminLayout",
      user: toObject(req.user),
      title: "Location",
      tab: "Customize",
    });
  }
  // [POST] - /location/store
  locationStore(req, res, next) {
    var addressDistrict;
    switch (req.body.district) {
      case "district-1":
        addressDistrict = "Quận 1";
        break;
      case "district-2":
        addressDistrict = "Quận 2";
        break;
      case "district-3":
        addressDistrict = "Quận 3";
        break;
      case "district-4":
        addressDistrict = "Quận 4";
        break;
      case "district-5":
        addressDistrict = "Quận 5";
        break;
      case "district-6":
        addressDistrict = "Quận 6";
        break;
      case "district-7":
        addressDistrict = "Quận 7";
        break;
      case "district-8":
        addressDistrict = "Quận 8";
        break;
      case "district-9":
        addressDistrict = "Quận 9";
        break;
      case "district-10":
        addressDistrict = "Quận 10";
        break;
      case "district-11":
        addressDistrict = "Quận 11";
        break;
      case "district-12":
        addressDistrict = "Quận 12";
        break;
      default:
        addressDistrict = "Quận 1";
        break;
    }
    var newLocation = new Location({
      name: req.body.name,
      address: req.body.address + ", " + addressDistrict,
      district: req.body.district,
      from: new Date(`1970-01-01T${req.body.from}:00.000Z`),
      to: new Date(`1970-01-01T${req.body.to}:00.000Z`),
    });

    newLocation
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
}

module.exports = new AdminController();
