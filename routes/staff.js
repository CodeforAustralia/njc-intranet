var express = require('express');
var router = express.Router();
var multer = require('multer');

var Staff = require('../models/staff');

/* GET all the staff */
router.get('/', function(req, res, next){
  var q = Staff.find();

  // execute the query at a later time
  q.exec(function (err, docs) {
    if (err) return handleError(err);
    res.json(docs);
  });
});

module.exports = router;
