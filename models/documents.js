// load the mongoose driver
var mongoose = require('mongoose');

var DocumentSchema = mongoose.Schema({
  title: String,
  description: String,
  extension: String,
  local_file: {type: Boolean, default: false},
  metadata: {
    category: String,
    type: {type: String},
    updated_at: {type: Date, default: new Date()}, // last time the file was updated
  },
  location: [{
    url: String,
    created_at: {type: Date, default: new Date()},
    version: {type: Number, default: 1},
  }],
  current_version: {type: Number, default: 1}, // nversion number to be displayed
  related: []
});

var Documents = mongoose.model('Documents', DocumentSchema);
module.exports = Documents;
