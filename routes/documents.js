var express = require('express');
var router = express.Router();
var multer = require('multer');

var Documents = require('../models/documents');

/* GET all the documents */
router.get('/', function(req, res, next){
  // find each person with a last name matching 'Ghost'
  var q = Documents.find();

  // execute the query at a later time
  q.exec(function (err, docs) {
    if (err) return handleError(err);
    res.json(docs);
  });
});

module.exports = router;
