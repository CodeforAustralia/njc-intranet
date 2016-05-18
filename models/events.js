// load the mongoose driver
var mongoose = require('mongoose');
var slugify = require('slugify');

var EventSchema = mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  url: String, // url to external / more info
  date: Date, // date of the event
  contact_person: { // who to contact for more infomation
    name: String,
    email: String
  },
  meta: {
    permalink: String,
    posted_at: {type: Date, default: new Date()},
    tags: [] // searchable tags
  }
});

EventSchema.pre('save', function(next){
  var stamp = Date.now();
  this.meta.permalink = slugify(stamp + "-" + this.title.toLowerCase());
  next();
});

var Events = mongoose.model('Events', EventSchema);
module.exports = Events;
