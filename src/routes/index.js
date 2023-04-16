const siteRouter = require('./site');
const adminRouter = require('./admin');
//const {upload} = require('../ulti/storage');
//const multer = require('multer');

function route(app){
    //app.use('/user', upload.single('image'), userRouter);
    app.use('/admin', adminRouter);

    app.use('/', siteRouter);
}

module.exports = route;