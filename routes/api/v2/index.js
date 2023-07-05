const express = require('express');

const router = express.Router();

router.use('/myapi',require('./my_api'));

module.exports = router;