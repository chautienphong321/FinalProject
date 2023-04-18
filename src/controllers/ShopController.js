
class SiteController {
    // [GET] - Index
    index(req, res, next){
        return res.render('shop', {
            title: 'Shop'
        });
    };
};

module.exports = new SiteController;