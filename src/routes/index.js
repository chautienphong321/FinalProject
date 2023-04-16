const siteRouter = require('./site');
//const {upload} = require('../ulti/storage');
//const multer = require('multer');

function route(app){
    //app.use('/user', upload.single('image'), userRouter);
    //app.use('/admin', adminRouter);

    app.use('/', siteRouter);
}

module.exports = route;