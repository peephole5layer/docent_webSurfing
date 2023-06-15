const User = require('../models/user');
module.exports.signup = function(req,res){

    console.log("User controller loaded");

    res.render('signup',{
        Title : "Sign Up",
        Message : ""
    });
}


module.exports.signin = function(req,res){
    console.log("signin controller loader");

    res.render('signin',{
        Title:"Sign In"
    });
}


module.exports.create=function(req,res){
    console.log("create controller loaded");


    
    if (req.body.password != req.body.confirm_password) {
        console.log("password doesn't match");
        return res.render('signup',{
            Title:"Sign Up",
            Message : "Password doesn't match !"
        });
    }

    let flag = true;

    console.log(req.body);
    User.findOne({ email: req.body.email }).then((err,user)=>{

        if(err){

            console.log("error while signing up");
            flag = false;
            return;

        }
        if (!user) {

            User.create({
                email: req.body.email,
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname
            });
        } else res.redirect('back');

    }).then(func=>{

        if(flag){

            return res.render('signin',{
                Title:"Sign In"
            });

        }else{
            return res.render('signup',{
                Title:"Sign Up",
                Message:"Email Already registered !"

            });
        }

      

    });























   
}


module.exports.createSession=function(req,res){
    console.log("user session controller loaded");

    return res.render('home',{
        Title:"Home",
        Message:""
    })
}

// function(err, user) {
//     if (err) {
//         console.log("error in finding email while signing Up");
//         return;
//     }

//     if (!user) {

//         User.create({
//             email: req.body.email,
//             password: req.body.pass,
//             fname: req.body.fname,
//             lname: req.body.lname
//         }, function(err, newUser) {
//             if (err) {
//                 console.log("Error in registering new user");
//                 return res.end("<h1> User with this email address is already registered </h1>");
//             }

//             return res.redirect('back');
//         });

//     } else res.redirect('back');
// }


// .then(err=>{

//     if (err) {
//         console.log("Error in registering new user");
//         return res.end("<h1> User with this email address is already registered </h1>");
//     }

//     return res.redirect('back');

// });