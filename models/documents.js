// load the mongoose driver
var mongoose = require('mongoose');
var Groups = require('./document-groups');

var DocumentSchema = mongoose.Schema({
  title: String,
  description: String,
  extension: String,
  local_file: {type: Boolean, default: false},
  metadata: {
    group: {
      type: mongoose.Schema.ObjectId,
      ref: Groups
    },
    show_online: {type: Boolean, default: false},
    category: String,
    topic: String,
    type: {type: String},
    updated_at: {type: Date, default: new Date()}, // last time the file was updated
  },
  location: {
    url: String,
    created_at: {type: Date, default: new Date()},
    version: {type: Number, default: 1},
  },  
  /*location: [{
    url: String,
    created_at: {type: Date, default: new Date()},
    version: {type: Number, default: 1},
  }],
  current_version: {type: Number, default: 1}, // nversion number to be displayed*/
  //related: []
});

var Documents = mongoose.model('Documents', DocumentSchema);
module.exports = Documents;
