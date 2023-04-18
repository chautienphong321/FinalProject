
class SiteController {
    // [GET] - Index
    index(req, res, next){
        return res.render('home', {isHomePage: true});
    };

    // [GET] - Error
    error(req, res, next){
        return res.render('partials/notfound', {layout: null});
    }
    
    // [GET] - login
    login(req, res, next){
        return res.render('login', {isLoginPage: true});
    };
};

module.exports = new SiteController;