// load the mongoose driver
var mongoose = require('mongoose');

var NewsSchema = mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  url: String, // url to external / more info
  meta: {
    permalink: String,
    posted_at: new Date(),
  }
});

var News = mongoose.model('News', NewsSchema);
module.exports = News;
