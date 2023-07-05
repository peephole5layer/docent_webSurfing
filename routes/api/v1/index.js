const express = require('express');

const router = express.Router();

router.use('/blacklist',require('./blacklist'));
router.use('/users',require('./users'));

module.exports = router;