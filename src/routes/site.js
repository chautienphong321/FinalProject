const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
//const { isLoggined } = require("../ulti/login");

const siteController = require("../controllers/SiteController");


//[GET] /error/:slug
router.use("/:slug", siteController.error);

// [GET} /index
router.get("/", siteController.index);

module.exports = router;