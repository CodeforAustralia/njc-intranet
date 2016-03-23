var express = require('express');
var router = express.Router();

/* GET all the categories */
router.get('/', function(req, res, next){
  var categories = [
    {'label':'All documents', 'value':'', 'active': 'active'},
    {'label':'Finance', 'value':'Finance', 'active':''},
    {'label':'HR', 'value':'HR','active':''},
    {'label':'OH&S', 'value':'OH&S','active':''},
  ];
  res.json(categories);
});

module.exports = router;
