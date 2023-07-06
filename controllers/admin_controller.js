module.exports.admin= function admin(req, res) {
    console.log("admin loaded");


  


    return res.render('admin', {
        Title: "admin page",
        
        
    });

   


}