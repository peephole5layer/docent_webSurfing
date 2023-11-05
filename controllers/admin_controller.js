const Blogs = require('../models/blogs');

module.exports.home= function(req, res) {
    console.log("admin loaded");

    if(req.user && req.user.access=='admin'){
        return res.render('admin', {
            Title: "admin page",     
        });
    }else{
        return res.send('<h1 style="text-align:center;"> UnAuthorized Access... Request Blocked!!! </h1>');
    }


   

}

module.exports.approveBlog = async function(req,res){


    try{

        const blog = await Blogs.findById(req.params.id);

        if(blog){

            blog.isApproved= 'Approved';
            blog.save();

            req.flash("success",`Blog Approved`);

        }
      
        return res.redirect('back');

    }catch(err){
        console.log("Error in approving blog ::: ",err);
        return;
    }



}


module.exports.rejectBlog = async function(req,res){

    try{

        if(await Blogs.findByIdAndDelete(req.params.id)){

            req.flash("success",`Blog removed`);

        }

     

    }catch(err){
        console.log("Error in rejecting blog ::: ",err);
        return;
    }



}