const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');


passport.use(new googleStrategy({

    clientID : env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_call_back_url

},

    async function(accessToken,refreshToken,profile,done){
        let user = await User.findOne({email:profile.emails[0].value});


        // .exec(async function(err,user){

        try{

            console.log(profile);
            console.log("heekkekeeiieiei");

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

                    user = newUser;

                }catch(err){

                    console.log("error in creating user google strategy-passport",err);
                    return;
                }

                console.log("exectued");

                return done(null,user);
            }

        }catch(err){
            console.log("Error in google strategy-passport",err);
            return;

        }

    

}));
         