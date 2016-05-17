// load the mongoose driver
var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  url: String, // url to external / more info
  date: new Date(), // date of the event
  contact_person: { // who to contact for more infomation
    name: String,
    email: String
  },
  meta: {
    permalink: String,
    posted_at: new Date(),
    tags: [] // searchable tags
  }
});

var News = mongoose.model('Events', EventSchema);
module.exports = News;
