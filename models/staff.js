// load the mongoose driver
var mongoose = require('mongoose');

var StaffSchema = mongoose.Schema({
  name: String,
  contact: {
    email: String,
    phone: Number,
    mobile: Number,
    ext: String,
  },
  organisation: {
    team: String,
    role: String
  },
  work_schedule: {
    'monday':false,
    'tuesday':false,
    'wednesday':false,
    'thursday':false,
    'friday':false,
  },
  status: {
    in: {type: Boolean, default: false},
    duty_worker: {type: Boolean, default: false}
  },
  last_updated: {type: Date, default: new Date()}
});

var Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;
