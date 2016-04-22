// load the mongoose driver
var mongoose = require('mongoose');

var DocumentSchema = mongoose.Schema({
  title: String,
  description: String,
  extension: String,
  local_file: Boolean,
  metadata: {
    category: String,
    type: {type: String},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
  },
  location: [{
    url: String,
    local_path: String,
    version: {type: Number, default: 1},
  }],
  related: []
});

var Documents = mongoose.model('Documents', DocumentSchema);
module.exports = Documents;
