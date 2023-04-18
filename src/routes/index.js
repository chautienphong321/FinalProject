const siteRouter = require('./site');
const adminRouter = require('./admin');
const shopRouter = require('./shop');
//const {upload} = require('../ulti/storage');
//const multer = require('multer');

function route(app){
    app.use('/shop',  shopRouter);

    app.use('/admin', adminRouter);

    app.use('/', siteRouter);
}

module.exports = route;