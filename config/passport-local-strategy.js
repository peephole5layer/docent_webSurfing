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
               
                
                return done(null,false);
            }

            return done(null,user);

        }catch(err){

            console.log("Passport Local Error : ",err);
     
        }
    }

));

passport.serializeUser(function(user,done){
    done(null,user.id);
});


passport.deserializeUser(async function(id,done){

    try{

        const user = await User.findById(id);
        return done(null,user);

    }catch(err){
        console.log('Error in finding user --> passport');
        return done(err);
    }
});


// Authentication check

passport.checkAuthentication = function(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }

    // user not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;