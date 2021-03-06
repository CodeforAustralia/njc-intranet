var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Staff = require('../models/staff');

/* GET all the staff */
router.get('/', function(req, res, next){
  var params = {};
  if (req.query.duty_worker) params['status.duty_worker'] = req.query.duty_worker;

  var q = Staff.find(params).select('name contact organisation status').sort('name');
  // execute the query at a later time
  q.exec(function (err, staff) {
    if (err) return res.json(err);
    res.json(staff);
  });
});

/* GET a staff members avatar */
router.get('/:id/avatar', function(req, res, next){
  var id = req.params.id;
  var q = Staff.findOne({_id: id}).select('avatar');

  console.log("Fetching avatar");

  // execute the query at a later time
  q.exec(function (err, results) {
    if (err) return res.json(err);
    // return the base64 image
    // if there is no image, we need a placeholder image that we can send
    var img = new Buffer(String(results.avatar), 'base64');

    res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
    });

    res.end(img);
  });
});

/* GET a staff member by id */
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  var q = Staff.find({_id: id});

  console.log("getting staff");

  // execute the query at a later time
  q.exec(function (err, staff) {
    if (err) return res.json(err);
    res.json(staff);
  });
});

/* POST create a new staff member */
router.post('/', function(req, res, next){
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");

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
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");

  var id = req.params.id;
  var model = req.body;
  var curr_duty_worker = {};
  var staff = {};

  if (model.name && model.email && model.role){
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
    staff = {
      status: {
        in: model.status.in,
        duty_worker: model.status.duty_worker,
        // clear the notes and return date if they have no value
        notes: model.status.notes || "",
        return_date: model.status.return_date || "",
      }
    };
  }

  if (!_.isUndefined(model.in) || !_.isUndefined(model.duty_worker)){
    staff.status = {
      in: model.in || false,
      duty_worker: model.duty_worker || false,
      notes: model.notes || "",
      return_date: model.return_date || "",
    };
  }

  // if updating the duty worker, unset the previous one
  if (staff.status){
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
  Staff.findByIdAndUpdate(id, {$set: staff}, function(err, data){
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
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");
});

module.exports = router;
