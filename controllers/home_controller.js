
module.exports.home = function(req, res) {
    console.log("controller loaded");
    console.log('present : ',req.cookies);

    console.log(req.params);

    return res.render('home', {
        Title: "Home",
        Success:"",
        Message:""
        
    });
}