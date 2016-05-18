var express = require('express');
var router = express.Router();

var DocumentGroups = require('../models/document-groups');

/* GET all the document topics */
router.get('/', function(req, res, next){
  // find each person with a last name matching 'Ghost'
  var q = DocumentGroups.find({});

  // execute the query at a later time
  q.exec(function (err, groups) {
    if (err) return handleError(err);
    res.json(groups);
  });
});


module.exports = router;
