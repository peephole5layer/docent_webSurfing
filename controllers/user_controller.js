const User = require('../models/user');
const ForgotPassToken = require('../models/forgot_pass_token');
const crypto = require('crypto');
const queue = require('../config/kue');
const forgotPasswordEmailWorder = require('../workers/forgot_password_worker');


module.exports.signup = function (req, res) {

    console.log("User controller loaded");

    res.render('signup', {
        Title: "Sign Up",
        Message: ""
    });
}


module.exports.signin = function (req, res) {
    console.log("signin controller loader");


    if (req.isAuthenticated()) {
        return res.redirect('/');
    }



    res.render('signin', {
        Title: "Sign In"
    });
}


module.exports.create = async function (req, res) {

    console.log("create controller loaded");

    if (req.body.password != req.body.confirm_password) {
        console.log("password doesn't match");
        return res.render('signup', {
            Title: "Sign Up",
            Message: "Password doesn't match !"
        });
    }

    console.log(req.body);

    const user = await User.findOne({ email: req.body.email });

    try {

        if (!user) {

            User.create({
                email: req.body.email,
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname,
                biometricData: null

            });

            return res.redirect('/users/signin');

        } else {

            return res.render('signup', {
                Title: "Sign Up",
                Message: "Email Already registered !"

            });
        }

    } catch (err) {

        console.log("error while signing up");
        return;
    }

}


module.exports.createSession = function (req, res) {
    console.log("user session controller loaded");
    req.flash('success', 'Logged In! ');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {

    req.logout(function (err) {

        if (err) {
            return next(err);
        }


        req.flash('success', 'Signed out!');


        return res.redirect('/');
    });

}


module.exports.forgotPassword = function (req, res) {
    return res.render('forgotPassword', {
        Action: "SearchEmail",
        Title: "Forgot Password"
    });
}

module.exports.findEmail = async function (req, res) {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (user != null) {

            let forgotPassToken = await ForgotPassToken.findOne({ user: user });

            if (forgotPassToken != null) {
                // console.log('not null');
                forgotPassToken.isValid = true;
                forgotPassToken.save();

            } else {
                // console.log('inside');

                forgotPassToken = await ForgotPassToken.create({
                    user: user._id,
                    token: crypto.randomBytes(20).toString('hex'),
                    isValid: true
                });


                // forgotPassToken = await forgotPassToken.populate('user','fname','lname','email').execPopulate();

                forgotPassToken.save();

            }



            // console.log(user);

            const data = [];
            data.push(user);
            data.push(forgotPassToken);

            // console.log(forgotPassToken.user.fname);

            let job = queue.create('findEmail', data).save(function (err) {

                if (err) {
                    console.log('Error in sending to the queue (job - forgot pass)');
                    return;
                }
                console.log('job enqueued (forgot password)', job.id);
            });

            return res.send('<h1 style="text-align:center ; ">Reset password link sent to your email!</h1>');
        } else {
            req.flash('error', 'Email not found!');
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error in finding email (forgot password)! ", err);
        return;
    }
}


module.exports.resetPasswordForm = async function (req, res) {

    console.log(req.params);


    try {

        let forgotPassToken = await ForgotPassToken.findOne({ token: req.params.token });

        console.log(forgotPassToken,"  hello");

        if (forgotPassToken.isValid) {

            setTimeout(function(){
                forgotPassToken.isValid=false;
                forgotPassToken.save();
            },300000);

            // forgotPassToken.isValid = false;

            // const user = await User.findById(forgotPassToken.user); 
            
            return res.render('resetPasswordForm', {
                Title: "Reset Password Form",
                Token: req.params.token,
                Message : ""

            })

        } else {
            console.log("hiii");

            return res.send('<h1 style="text-align:center ;" >Link expired !!!</h1>');
        }


    } catch (err) {
        console.log("Error in Reset Password Form : ", err);
        return ;
    }

}


module.exports.resetPassword = async function(req,res){


    try{

        console.log(req.body.password," ",req.body.confirm_password);

        if(req.body.password!=req.body.confirm_password){

            console.log("hi");

            req.flash('error', "Password doesn't match !!!");

            return res.redirect('back');
    
        }

        let forgotPassToken = await ForgotPassToken.findOne({ token: req.params.token });

        forgotPassToken.isValid = false;
        forgotPassToken.save();


        
    
        const user  = await User.findById(forgotPassToken.user);
    
        user.password = req.body.password;
        user.save();
    
        return res.send('<h1 style="text-align:center ; "> Password Reset Successfull</h1>');
    

    }catch(err){

        console.log("Error in reset Password controller : ",err);
        return ;

    }

  


  



}




