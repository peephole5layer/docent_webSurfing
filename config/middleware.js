module.exports.setFlash = async function(req,res,next){

    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    console.log("middeleware flash loaded");

    next();
}