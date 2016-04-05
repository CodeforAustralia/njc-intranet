var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
var Staff = require('../models/staff');

//var StaffList = require('../models/seeds/staff-list.json'); - path to staff seeder if needed

/* GET /staff - Seed the staff db */
router.get('/staff', function(req, res, next){
  //console.log(StaffList);
  var staff_model = null;

  _.each(StaffList.staff, function(staff, key){
    console.log(key);
    console.log(staff);

    Staff.findOne({'name':staff.name}, function(err, result){
      if (!result){
        // no duplicates please
        staff_model = new Staff({
          name: staff.name,
          contact: {
            ext: staff.ext,
            mobile: staff.mobile || null,
          }
        });
      // TODO: read the staff members work schedule
      //if (_.isUndefined(staff.))

        staff_model.save(function(){
          if (key == StaffList.staff.length-1){
            console.log("Finishing");
            sendJson(res, StaffList.staff);
          }
        });
      }
    });
  });
});

router.get('/staff/purge', function(req, res, next){
  Staff.find({}).remove(function(err){
    if (err) console.log(err);
    res.send("Deleted all staff");
  });
});

function sendJson(res, data){
  console.log("Finishing");
  res.json(data);
}

module.exports = router;
