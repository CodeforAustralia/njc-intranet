var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
//var config = require('../config.json');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  var env = app.get('env');
  res.render('index', { title: 'NJC Intranet', env: env });
});

module.exports = router;
