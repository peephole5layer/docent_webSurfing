module.exports.signup = function(req,res){

    console.log("User controller loaded");

    res.render('signup',{
        Title : "Sign Up"
    });
}