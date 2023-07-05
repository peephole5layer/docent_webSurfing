const express = require('express');

const router = express.Router();

const myApi = require('../../../controllers/api/v2/my_api');

router.get('/',myApi.index);




module.exports = router;