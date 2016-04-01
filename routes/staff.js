var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Staff = require('../models/staff');

/* GET all the staff */
router.get('/', function(req, res, next){
  var q = Staff.find().sort('name');

  // execute the query at a later time
  q.exec(function (err, staff) {
    if (err) return res.json(err);
    res.json(staff);
  });
});

/* GET a staff member by id */
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  var q = Staff.find({_id: id});

  // execute the query at a later time
  q.exec(function (err, staff) {
    if (err) return res.json(err);
    res.json(staff);
  });
});

/* POST create a new staff member */
router.post('/', function(req, res, next){
  var model = req.body; // get the passed fields

  var staff = new Staff({
    name: model.name,
    contact: {
      ext: model.ext || null,
      email: model.email || null,
      phone: model.phone || null,
      mobile: model.mobile || null,
    },
    organisation: {
      team: model.team || null,
      role: model.role || null,
    }
  });

  // save the new staff member
  staff.save(function(err, staff){
    if (err) return res.json(err);
    res.json(staff);
  });

});

/* PUT /:id full update of the model with the specified id */
router.put('/:id', function(req, res, next){
  var id = req.params.id;
  var model = req.body;

  var staff = {
    name: model.name,
    contact: {
      ext: model.ext,
      email: model.email,
      phone: model.phone || "",
      mobile: model.mobile || "",
    },
    organisation: {
      team: model.team,
      role: model.role,
    },
    status: {
      in: model.in,
      duty_worker: model.duty_worker,
    }
  };

  Staff.findByIdAndUpdate(id, {$set: staff}, function(err, data){
    console.log(err);
    console.log(staff);
    console.log(data);
    if (err) return res.json(err);
    res.json(staff);
  });

});

/* PATCH /:id partial update of the model with the specified id */
router.patch('/:id', function(req, res, next){

});

module.exports = router;
