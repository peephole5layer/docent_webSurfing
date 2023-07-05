const express = require('express');
const router = express.Router();

const passport = require('passport');
const SessionChallengeStore = require('passport-fido2-webauthn').SessionChallengeStore;
const store = new SessionChallengeStore();
var base64url = require('base64url');


router.use(express.static('./assets'));

const blackListController = require('../controllers/blackList_controller');

router.post('/blacklist/:id/challenge', function(req, res, next) {
  console.log("helloieie");
    store.challenge(req, function(err, challenge) {
      if (err) { return next(err); }
      res.json({ challenge: base64url.encode(challenge) });
    });
    console.log("hello");
  });
  // /blacklist/:id

router.post('/blacklist/:id',blackListController.blackList);
router.get('/blacklisted-urls',blackListController.blackListedUrls);

// router.post('/blacklisted-urls',)

console.log("blackList router loaded");
module.exports = router;