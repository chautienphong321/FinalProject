const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const shopController = require("../controllers/ShopController");


// [GET} /index
router.get("/", shopController.index);

module.exports = router;