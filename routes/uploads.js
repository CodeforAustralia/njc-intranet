var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var Documents = require('../models/documents');

var uploader = multer({dest: './uploads'});

/* POST new file upload */
// handle the file upload, return an id object that can be used to associate the file with a document
router.post('/', uploader.single('file'), function(req, res, next) {
  // handle a single file upload
  // move the file to proper storage
  var filepath = req.file.path;
  var fileext = path.extname(req.file.originalname);
  // create the database entry
  var model = req.body; // get the post fields submitted

  var doc = new Documents({
    title: model.title,
    description: model.description,
    metadata:{
      category: model.category,
      topic: model.topic,
    },
    revision: {path: filepath},
    extension: fileext
  });

  doc.save(function(err, document){
    if (err) return res.json(err);
  });

  console.log("SAVED");

  // delete uploaded file
  res.json(doc);
  //res.send(doc);
});

router.patch('/', function(req, res, next) {
  console.log("Updating a doc");
  // bump the doc version number
});

module.exports = router;
