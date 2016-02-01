var express = require('express');
var router = express.Router();
var multer = require('multer');
var Documents = require('../models/documents');

var uploader = multer({dest: './uploads'});

/* POST new file upload */
// handle the file upload, return an id object that can be used to associate the file with a document
router.post('/', uploader.single('file'), function(req, res, next) {
  // handle a single file upload
  console.log("Uploading a file");
  console.log(req.file);
  console.log(req.param);
  console.log(req.body);
  // get the file path

  // move the file to proper storage
  var file_path = "";
  var file_ext = "";

  // create the database entry
  var model = req.body; // get the post fields submitted

  var doc = new Documents({
    title: model.title,
    description: model.description,
    metadata:{
      category: model.category,
      topic: model.topic,
    },
    revision: {path: file_path},
    extension: file_ext
  });

  doc.save(function(err, document){
    console.log(err);
    if (err) throw new Error(err);


    console.log("Saved the new file");
    console.log(document);
  });

  // delete uploaded file
  res.send("Done");
});

router.patch('/', function(req, res, next) {
  console.log("Updating a doc");
  // bump the doc version number
});

module.exports = router;
