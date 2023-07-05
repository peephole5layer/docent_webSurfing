
module.exports.home = function(req, res) {
    console.log("controller loaded");
    console.log('present : ',req.cookies);

    return res.render('home', {
        Title: "Home",
        Success:"",
        Message:""
        
    });
}