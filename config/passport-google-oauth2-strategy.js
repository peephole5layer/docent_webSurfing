const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({

    clientID : "1012046356057-0qtcguk00fddtcrf9auk7ilh420ek0hp.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"

},

    async function(accessToken,refreshToken,profile,done){
        const user = await User.findOne({email:profile.emails[0].value});


        // .exec(async function(err,user){

        try{

            console.log(profile);

            if(user){
                return done(null,user);
            }else{

                try{
                    const newUser = await User.create({
                        fname : profile.name.givenName,
                        lname: profile.name.familyName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });

                }catch(err){

                    console.log("error in creating user google strategy-passport",err);
                    return;
                }

                return done(null,user);
            }

        }catch(err){
            console.log("Error in google strategy-passport",err);
            return;

        }
           
}));