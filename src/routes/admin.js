const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const adminController = require("../controllers/AdminController");

// [POST] /carousel/store
router.post("/carousel/store", adminController.carouselStore);

// [GET] /carousel
router.get("/carousel", adminController.carousel);

// [GET] /video
router.get("/video", adminController.video);

// [GET] /gallery
router.get("/gallery", adminController.gallery);

// [GET] /location
router.get("/location", adminController.location);

// [GET] /index
router.get("/product", adminController.product);

// [GET] /index
router.get("/", adminController.index);

module.exports = router;
