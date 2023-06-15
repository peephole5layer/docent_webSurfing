const express = require('express');

const router = express.Router();



const homeController = require('../controllers/home_controller');
const blackListController = require('../controllers/blackList_controller');

const userController = require('../controllers/user_controller');

router.get('/', homeController.home);

router.get('/signup',userController.signup);



router.use('/users', require('./users'));

router.post('/blacklist',blackListController.blackList);












console.log("router loaded");

module.exports = router;