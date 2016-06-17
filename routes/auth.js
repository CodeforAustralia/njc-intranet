var express = require('express');
var passport = require('passport');
var router = express.Router();
var helpers = require('../helpers');
var AuthUser = require('../models/authUser');

// The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
router.post('/login',
  passport.authenticate('local'),
  function(req, res, err) {
    //if (err) res.json(err);
    res.sendStatus(200);
  });

// seeder
router.post('/seeder', function(req, res, err){
  console.log("seeder");
  console.log(req);

  AuthUser.register(new AuthUser({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
        return res.json({"error": err});
      }

      res.json(user);
  });

});

router.get('/logout', function(req, res) {
  console.log("Logging out");
  req.logout();
  res.redirect('/');
});

module.exports = router;
