var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Staff = require('../models/staff');

/* GET all the staff */
router.get('/', function(req, res, next){
  var params = {};
  if (req.query.duty_worker) params['status.duty_worker'] = req.query.duty_worker;

  var q = Staff.find(params).sort('name');
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
    avatar: model.profile.base64 || null,
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
  console.log(model);
  var curr_duty_worker = {};
  var staff = {};

  if (model.name && model.email && model.role){
    console.log("Updated staff obj");
    staff = {
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

    if (model.profile.base64) staff.avatar = model.profile.base64;
  }

  if (model.status){
    console.log("Status field");
    staff = {
      status: {
        in: model.status.in,
        duty_worker: model.status.duty_worker,
      }
    };
  }

  if (!_.isUndefined(model.in) && !_.isUndefined(model.duty_worker)){
    console.log("Status");
    staff.status = {
      in: model.in,
      duty_worker: model.duty_worker,
    };
  }

  // if updating the duty worker, unset the previous one
  if (staff.status){
    console.log("Update status");
    resetDutyWorker()
    .then(function(data){
      console.log(data);
      updateById(id, staff, res);
    })
    .catch(function(err){
      console.log("ERROR");
      console.log(err);
    });
  }
  else {
    updateById(id, staff, res);
  }
});

function updateById(id, staff, res){
  console.log("Updating");
  console.log(staff);
  Staff.findByIdAndUpdate(id, {$set: staff}, function(err, data){
    console.log(err);
    console.log(data);
    //console.log(id);
    //console.log(staff);
    if (err) return res.json(err);

    res.json(staff);
  });
}

function resetDutyWorker(){
  return new Promise(function(resolve, reject){
    Staff.update({'status.duty_worker': true}, {$set: {'status.duty_worker': false}}, {multi: true}, function(err, data){
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

/* PATCH /:id partial update of the model with the specified id */
router.patch('/:id', function(req, res, next){

});

module.exports = router;
