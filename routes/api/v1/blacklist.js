const express = require('express');

const router = express.Router();
const passport = require('passport');
const blacklistApi = require('../../../controllers/api/v1/blacklist_api');


router.get('/',blacklistApi.index);
router.delete('/:id', passport.authenticate('jwt',{session:false}),blacklistApi.destroy);

module.exports = router;

// passport.authenticate('jwt',{session:false})