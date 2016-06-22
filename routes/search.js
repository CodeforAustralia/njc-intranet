var express = require('express');
var router = express.Router();
var _ = require('lodash');


var async = require('async');
var News = require('../models/news');
var Events = require('../models/events');
var Staff = require('../models/staff');
var Documents = require('../models/documents');

/* GET all search data */
router.get('/', function(req, res, next) {
  async.parallel([
    staff,
    documents,
    news,
    events
  ], function(err, results){
    if (err) res.status(500);
    var raw = _.flatten(results);
    // merge all the results into 1 array
    var parsed = [];
    _.each(raw, function(r){
      var item = parseResult(r);
      if (item) parsed.push(item);
    });
    res.json(_.sortBy(parsed, ['title']));
  })
});

function parseResult(item){
  var parsed = null;
  switch (item.type){
    case 'staff':
      parsed = {'title': item.name, 'url': "#/staff?q=" + item.name, 'type': 'staff'};
      break;
    case 'event':
      parsed = {'title': item.title, 'url': "#/events/" + item.meta.permalink, 'type': 'event'};
      break;
    case 'news':
      parsed = {'title': item.title, 'url': "#/news/" + item.meta.permalink, 'type': 'news'};
      break;
    case 'document':
      parsed = {'title': item.title, 'url': "#/documents?q=" + item.title, 'type': 'document'};
      break;
    default:
      return null;
  }
  return parsed;
}

function addTypes(arr, type){
  return _.map(arr, function(item){
    item.type = type; return item;
  })
}

function staff(cb){
  Staff.find({}, function(err, res){
    if (err) res.status(500);

    cb(null, addTypes(res, 'staff'));
  });
}

function documents(cb){
  Documents.find({}, function(err, res){
    if (err) res.status(500);
    cb(null, addTypes(res, 'document'));
  });
}

function news(cb){
  News.find({}, function(err, res){
    if (err) res.status(500);
    cb(null, addTypes(res, 'news'));
  });
}

function events(cb){
  Events.find({}, function(err, res){
    if (err) res.status(500);
    cb(null, addTypes(res, 'event'));
  });
}

module.exports = router;
