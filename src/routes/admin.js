const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const adminController = require("../controllers/AdminController");

// [POST] /carousel/store
router.post("/carousel/store", adminController.carouselStore);
// [GET] /carousel
router.get("/carousel", adminController.carousel);

// [POST] /video/store
router.post("/video/store", adminController.videoStore);
// [GET] /video
router.get("/video", adminController.video);

// [POST] /gallery/store
router.post("/gallery/store", adminController.galleryStore);
// [GET] /gallery
router.get("/gallery", adminController.gallery);

// [GET] /location/delete?id=
router.get("/location/delete/:id", adminController.locationDelete);
// [POST] /location/store
router.post("/location/store", adminController.locationStore);
// [GET] /location
router.get("/location", adminController.location);

// [GET] /index
router.get("/product", adminController.product);

// [GET] /index
router.get("/", adminController.index);

module.exports = router;
