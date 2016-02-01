// load the mongoose driver
var mongoose = require('mongoose');

var StaffSchema = mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  status: {
    in: {type: Boolean, default: false},
    duty_worker: {type: Boolean, default: false}
  },
  last_updated: {type: Date, default: new Date()}
});

var Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;
