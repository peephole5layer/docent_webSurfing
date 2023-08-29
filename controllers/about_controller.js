
module.exports.about= function about(req, res) {
    console.log("about loaded");





    return res.render('about', {
        Title: "about page",


    });




}