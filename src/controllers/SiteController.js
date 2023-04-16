// Library


// Models


// Utils

class SiteController {
    // [GET] - Index
    index(req, res, next){
        console.log(1)
        return res.redirect('/');
    };

    // [GET] - Error
    error(req, res, next){
        return res.redirect('/');
    }
};

module.exports = new SiteController;