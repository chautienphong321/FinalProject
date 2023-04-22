const siteRouter = require("./site");
const adminRouter = require("./admin");
const { verifyToken, verifyAdmin } = require("../utils/verifyToken");
//const {upload} = require('../ulti/storage');
//const multer = require('multer');

function route(app) {
  app.use("/admin", verifyToken, verifyAdmin, adminRouter);

  app.use("/", siteRouter);
}

module.exports = route;
