module.exports.admin= function admin(req, res) {
    console.log("admin loaded");

    



    if(req.user && req.user.access=='admin'){
        return res.render('admin', {
            Title: "admin page",     
        });
    }else{
        return res.send('<h1 style="text-align:center;"> UnAuthorized Access... Request Blocked!!! </h1>');
    }
}