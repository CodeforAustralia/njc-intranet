var express = require('express');
var router = express.Router();
var json2csv = require('json2csv');
var moment = require('moment');

var Feedback = require('../models/feedback');

var export_fields = [
  {label: 'type_of_feedback', value: 'type', default: 'NULL'},
  {label: 'message', value: 'message', default: 'NULL'},
  {label: 'staff_member', value: 'staff_member', default: 'NULL'},
];

function returnCSV(res, data, filename){
  filename = (typeof filename === 'undefined') ? "feedback-"+moment().unix()+".csv" : filename;
  // handle errors - probably wrap in a throw / catch
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.set('Content-Type', 'text/csv');
  res.status(200).send(data);
}


// ADD A UI FOR ALL THE FEEDBACK - MARK THE STATUS OF THE FEEDBACK - + show if it was manually entered?

/* GET all the staff */
router.get('/', function(req, res, next){
  Feedback.find({}, function(err, data){
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get('/export',function(req, res, next){
  var query = Feedback.find();
  query.exec(function(err, data){
    if (err) throw new Error(err);

    var csv = json2csv({
      data: data,
      fields: export_fields
    });

    return returnCSV(res, csv);
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
