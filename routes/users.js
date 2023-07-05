const express = require('express');
const router = express.Router();
const passport = require('passport');

/*middlewares*/
router.use(express.static('./assets'));


/*controllers*/

const userController = require('../controllers/user_controller');



router.get('/signup',userController.signup);
router.get('/signin',userController.signin);


router.post('/create-user',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),userController.createSession);

router.get('/destroy-session',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createSession);


router.get('/forgot-password',userController.forgotPassword);
router.post('/find-email',userController.findEmail);












console.log("user router loaded");

module.exports = router;