var express = require('express');
var router = express.Router();

var Staff = require('../models/staff');

/* GET all the staff */
router.get('/', function(req, res, next){
  var q = Staff.find();

  // execute the query at a later time
  q.exec(function (err, docs) {
    if (err) return handleError(err);
    res.json(docs);
  });
});

/* POST create a new staff member */
router.post('/', function(req, res, next){
  var model = req.body; // get the passed fields

  var staff = new Staff({
    name: model.name,
    contact: {
      ext: model.ext,
      email: model.email,
      phone: model.phone,
      mobile: model.mobile,
    },
    organisation: {
      team: model.team,
      role: model.role,
    }
  });

  // save the new staff member
  staff.save(function(err, staff){
    if (err) return res.json(err);
    res.json(staff);
  });

});

module.exports = router;
