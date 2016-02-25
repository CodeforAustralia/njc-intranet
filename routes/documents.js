var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var mimetypes = require('mime-types');

var Documents = require('../models/documents');

/* GET a document by its id */
router.get('/:id', function(req, res, next){
  var id = String(req.params.id);
  // find each person with a last name matching 'Ghost'
  var q = Documents.findOne({ _id: id });

  // execute the query at a later time
  q.exec(function(err, doc) {
    if (err) return res.sendStatus(404);

    // return the file
    var firstVer = (typeof doc.revision[0] !== 'undefined') ? doc.revision[0] : doc.revision;
    var buffer = fs.readFileSync("./" + firstVer.path);
    var content_type = mimetypes.contentType(doc.extension);
    if (content_type){
      console.log(content_type);
      res.set('Content-Type', content_type);
      res.set('Content-Disposition', 'inline');
      res.send(buffer);
    }
    else {
      return res.sendStatus(500).end();
    }
  });
});


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
