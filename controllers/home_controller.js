
module.exports.home = function(req, res) {
    console.log("controller loaded");
    console.log('present : ',req.cookies);

    console.log(req.params);

    if(req.user && req.user.access=='admin'){
        return res.redirect('/admin');
    }else{

        return res.render('home', {
            Title: "Home",
            Success:"",
            Message:""
            
        });

    }

   
}