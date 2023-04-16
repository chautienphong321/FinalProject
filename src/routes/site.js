const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
//const { isLoggined } = require("../ulti/login");

const siteController = require("../controllers/SiteController");

router.use(cookieParser());

//[GET] /error/:slug
router.use("/:slug", siteController.error);

// [GET} /index
router.get("/", siteController.index);

module.exports = router;