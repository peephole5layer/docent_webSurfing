const passport = require('passport');
const WebAuthnStrategy = require('passport-fido2-webauthn').Strategy;
const SessionChallengeStore = require('passport-fido2-webauthn').SessionChallengeStore;

const store = new SessionChallengeStore();

const User = require('../models/user');
const Link = require('../models/links');


passport.use(
    new WebAuthnStrategy(
        {
            store:store,
            attestationType: 'indirect',
            authenticatorSelection: {
                userVerification: 'required',
            },
        },

        // (user, done) =>
    
        (user, done) => {
            // Pass the user object (including attestationResponse) to the controller
            console.log(hello);
            return done(null, user);
        }

    ));





module.exports=passport;