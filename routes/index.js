var express = require('express');
var passport = require('passport');
var flash = require('express-flash');
var router = express.Router();
var helpers = require('../helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NJC Intranet' });
});

module.exports = router;
