
class SiteController {
    // [GET] - Index
    index(req, res, next){
        return res.render('home', {isHomePage: true});
    };

    // [GET] - Error
    error(req, res, next){
        return res.render('partials/notfound', {layout: null, title: "404 Not Found"});
    };
    
    // [GET] - login
    login(req, res, next){
        return res.render('login', {isLoginPage: true, title: "Login"});
    };
    
    // [GET] - customize
    customize(req, res, next){
        return res.render('customize', {isCustomizePage: true, title: "Customize"});
    };
};

module.exports = new SiteController;