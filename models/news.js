// load the mongoose driver
var mongoose = require('mongoose');
var slugify = require('slugify');

var NewsSchema = mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  url: String, // url to external / more info
  meta: {
    permalink: String,
    posted_at: {type: Date, default: new Date()},
    tags: [] // searchable tags
  }
});

NewsSchema.pre('save', function(next){
  var stamp = Date.now();
  this.meta.permalink = slugify(stamp + "-" + this.title.toLowerCase());
  next();
});

var News = mongoose.model('News', NewsSchema);
module.exports = News;
