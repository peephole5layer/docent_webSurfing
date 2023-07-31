const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport

passport.use(new LocalStrategy({

        usernameField : 'email',
        passReqToCallback : true
    },

    async function(req,email,password,done){

        try{

            const user = await User.findOne({email:email});
            console.log(email);

            if(!user || user.password!=password){

                req.flash("error","Invalid email/password");
                
                return done(null,false);
            }

            return done(null,user);

        }catch(err){

            console.log("Passport Local Error : ",err);
        }
    }

));

passport.serializeUser(async function(user,done){
    done(null,user.id);
});


passport.deserializeUser(async function(id,done){

    try{

        const user = await User.findById(id);
        // req.flash('success', 'Signed out!');
        return done(null,user);

    }catch(err){
        console.log('Error in finding user --> passport');
        return done(err);
    }
});


// Authentication check

passport.checkAuthentication = async function(req,res,next){

    if(req.isAuthenticated()){

        // console.log("auth check")

       
        return next();
    }

    // user not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = async function(req,res,next){
    if(req.isAuthenticated()){

        console.log("set user");
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;