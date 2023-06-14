const express = require('express');



const router = express.Router();

router.use(express.static('./assets'))


const userController = require('../controllers/user_controller');

router.get('/signup',userController.signup);

console.log("user router loaded");

module.exports = router;