
module.exports.home = function(req, res) {
    console.log("controller loaded");


    console.log(req.cookies);


    return res.render('home', {
        Title: "Home",
        
    });

   


}