const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { verifyToken } = require("../utils/verifyToken");
const siteController = require("../controllers/SiteController");

// [POST] /store
router.post("/store", siteController.store);

// [POST] /validate
router.post("/validate", siteController.validate);

// [GET] /login
router.get("/login", siteController.login);

// [GET] /register
router.get("/register", siteController.register);

// [GET] /customize
router.get("/customize", verifyToken, siteController.customize);

//[GET] /error/:slug
router.use("/:slug", verifyToken, siteController.error);

// [GET] /index
router.get("/", verifyToken, siteController.index);

module.exports = router;
