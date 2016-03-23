var express = require('express');
var router = express.Router();

/* GET all the topics */
router.get('/', function(req, res, next){
  res.json(categories);
});

module.exports = router;
