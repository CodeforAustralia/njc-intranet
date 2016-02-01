var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploader = multer({dest: './uploads'});

/* POST new file upload */
router.post('/', uploader.single('file'), function(req, res, next) {
  // handle a single file upload
  console.log("Uploading a file");
  console.log(req.file);
  // get the file path

  // move the file to proper storage

  // delete uploaded file
  res.send("Done");
});

module.exports = router;
