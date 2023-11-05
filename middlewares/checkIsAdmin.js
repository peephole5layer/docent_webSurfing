

module.exports.checkIsAdmin = function(req,res,next){

    if(req.user && req.user.access=='admin'){
        return res.redirect('/admin');
    }

    next();

}