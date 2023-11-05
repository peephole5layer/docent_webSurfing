const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');


router.get('/',adminController.home);

router.get('/approveBlog/:id',adminController.approveBlog);

router.post('/rejectBlog/:id',adminController.rejectBlog);


module.exports = router;