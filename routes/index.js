const express = require('express');

const router = express.Router();
const passport = require('passport');
const SessionChallengeStore = require('passport-fido2-webauthn').SessionChallengeStore;
const store = new SessionChallengeStore();
const base64url = require('base64url');




const homeController = require('../controllers/home_controller');
const checkAdminMiddleware = require('../middlewares/checkIsAdmin');




const adminController = require('../controllers/admin_controller');
// const blogController =require("../controllers/blog_controller");

const userController = require('../controllers/user_controller');
// const blackListController = require('../controllers/blackList_controller');
const articleController = require('../controllers/article_controller');
const reliableSitesController = require('../controllers/reliableSites_controller');
const aboutController =require('../controllers/about_controller');


router.get('/',checkAdminMiddleware.checkIsAdmin, homeController.home);
router.get('/signup',userController.signup);
router.get('/article/:str1/:str2/:str3',articleController.article);
router.get('/about', aboutController.about);
router.get('/reliableSites/:index',reliableSitesController.reliableSites);



router.use('/admin', require('./admin'));
router.use('/users', require('./users'));
router.use('/blog',require('./blogs'));
router.use('/report',require('./report'));
router.use('/api',require('./api'));

console.log("router loaded");

module.exports = router;