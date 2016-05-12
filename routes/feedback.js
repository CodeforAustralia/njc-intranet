var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');

/* GET all the staff */
router.get('/', function(req, res, next){
  Feedback.find({}, function(err, data){
    if (err) return res.json(err);
    return res.json(data);
  });
});

/* POST create some new feedback */
router.post('/', function(req, res, next){
  var model = req.body; // get the passed fields

  var feedback = new Feedback({
    type: model.type,
    message: model.message,
    staff_member: model.staff_member,
  });

  // save the new feedback item
  feedback.save(function(err, feedback){
    if (err) return res.json(err);
    res.json(feedback);
  });

});

module.exports = router;
