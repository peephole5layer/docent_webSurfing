const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();




const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(`./assets/uploads`));
    },
    filename : function(req,file,cb){
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1e9);
        // cb(null,file.fieldname + "-"+ uniqueSuffix);
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    }
});

const upload = multer({storage:storage});


const blogController =require("../controllers/blog_controller");


router.get('/',blogController.blog);

router.post('/create-blog',upload.single("coverImage"),blogController.createBlog);
router.get('/delete/:id',blogController.delete);

router.get('/:id',blogController.blogContent);
// ,


console.log("blog router loaded");

module.exports = router;