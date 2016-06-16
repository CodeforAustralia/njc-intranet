var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken'); //create, sign, and verify authentication tokens
var flash = require('express-flash');
var router = express.Router();
var helpers = require('../helpers');
var AuthUser = require('../models/authUser');
var config = process.env;

// The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
router.post('/token',
  passport.authenticate('local'),
  function(req, res, next) {
    console.log(req);
    //console.log(res);
    var user = {
      //username: res.user.username,
      username: req.body.username,
      admin: false
    };
    // passport handles errors in its middleware
    // generate a token and send it back
    var token = jwt.sign(user, config.TOKEN_SECRET, {
      expiresIn: "24h"
    });

    //res.json(user);
    res.json({
      success: true,
      message: "authenticated",
      token: token
    });
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
      res.send("done");
  });

});

router.get('/logout', function(req, res) {
  console.log("Logging out");
  req.logout();
  res.redirect('/');
});

module.exports = router;
