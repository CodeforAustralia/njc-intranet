// load the mongoose driver
var mongoose = require('mongoose');
var Documents = require('./documents');

var DocumentGroupSchema = mongoose.Schema({
  title: String,
  description: String,
  metadata: {
    category: String,
    updated_at: {type: Date, default: new Date()}, // last time the file was updated
  },
  // maybe just make this a one to many relationship with documents for now
  /*documents: [{
    type: mongoose.Schema.ObjectId,
    ref: Documents
  }]*/
});

var DocumentGroups = mongoose.model('DocumentGroups', DocumentGroupSchema);
module.exports = DocumentGroups;
