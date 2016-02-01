// load the mongoose driver
var mongoose = require('mongoose');

var DocumentSchema = mongoose.Schema({
  title: String,
  description: String,
  extension: String,
  metadata: {
    category: String,
    topic: String,
  },
  revision: {
    path: String,
    version: {type: Number, default: 1},
    created_at: {type: Date, default: new Date()}
  }
});

var Documents = mongoose.model('Documents', DocumentSchema);
module.exports = Documents;
