
class SiteController {
    // [GET] - Index
    index(req, res, next){
        return res.render('home', {isHomePage: true});
    };

    // [GET] - Error
    error(req, res, next){
        return res.render('partials/notfound', {layout: null});
    }
};

module.exports = new SiteController;