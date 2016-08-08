var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken'); //create, sign, and verify authentication tokens
var router = express.Router();
var helpers = require('../helpers');
var AuthUser = require('../models/authUser');
var config = process.env;

// The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
router.post('/token',
  passport.authenticate('local'),
  function(req, res, next) {

    // get the user naem
    var user = {
      username: req.body.username
    };

    // passport handles errors in its middleware
    // generate a token and send it back
    var token = jwt.sign(user, config.TOKEN_SECRET, {
      expiresIn: "24h"
    });

    AuthUser.find({'username':user.username}, function(err, u){
      if (err) return res.status(500);

      res.json({
        success: true,
        message: "authenticated",
        token: token,
        user: u
      });
    });
  });

// seeder
router.post('/seeder', function(req, res, err){
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");

  AuthUser.register(new AuthUser({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
          return res.json({"error": err});
      }

      res.json(user);
      res.send("done");
  });

});

router.get('/logout', function(req, res) {
  console.log("Logging out");
  req.logout();
  res.redirect('/');
});

module.exports = router;
