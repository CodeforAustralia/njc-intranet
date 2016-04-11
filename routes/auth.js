var express = require('express');
var passport = require('passport');
var flash = require('express-flash');
var router = express.Router();
var helpers = require('../helpers');
var AuthUser = require('../models/authUser');

// The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
router.post('/login', passport.authenticate('local', {
                                   //successRedirect: '/',
                                   //failureRedirect: '/',
                                   //failureFlash: 'Invalid username or password.'
                                  }),
                                   function(req, res, err) {
  console.log("Logging in");
  console.log(err);
  req.send({'message': 'Logged in successfully'});
});

// seeder
router.post('/seeder', function(req, res, err){
  console.log("seeder");
  
  var u = new AuthUser({
    username: 'njc',
    password: 'collingwood'
  });

  u.save(function(err, data){
    if (err) throw new Error(err);

    res.send(u);
  });
});

router.get('/logout', function(req, res) {
  console.log("Logging out");
  req.logout();
  res.redirect('/');
});

module.exports = router;
