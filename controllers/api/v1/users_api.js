const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Invalid username or password"
            });
        }

        // return res.redirect('/');

         res.json(200,{
            message: 'Sign in successful , here is your token , please keep it safe!',
            data: {
                token : jwt.sign(user.toJSON(),'webSurf',{expiresIn:'100000000'})
            }
        });

        res.locals.user = req.body.user;

        return res.redirect('/');

    }catch(err){
        console.log("error::", err);
        return;

    }

  
  
}

