
class SiteController {
    // [GET] - Index
    index(req, res, next){
        return res.render('admin', {
            layout: 'adminLayout'
        });
    };
};

module.exports = new SiteController;