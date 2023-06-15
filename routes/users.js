const express = require('express');
const router = express.Router();

/*middlewares*/
router.use(express.static('./assets'));


/*controllers*/

const userController = require('../controllers/user_controller');



router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/create-user',userController.create);
router.post('/create-session',userController.createSession)










console.log("user router loaded");

module.exports = router;