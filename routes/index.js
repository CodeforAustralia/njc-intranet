var express = require('express');
var passport = require('passport');
var flash = require('express-flash');
var router = express.Router();
var helpers = require('../helpers');
var config = require('../config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NJC Intranet', appConfig: config });
});

module.exports = router;
