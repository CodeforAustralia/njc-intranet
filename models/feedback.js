// load the mongoose driver
var mongoose = require('mongoose');

var FeedbackSchema = mongoose.Schema({
  type: String,
  message: String,
  staff_member: String,
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
