const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const adminController = require("../controllers/AdminController");


// [GET} /index
router.get("/", adminController.index);

module.exports = router;