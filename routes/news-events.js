var express = require('express');
var router = express.Router();
var async = require('async');
var _ = require('lodash');

// models
var News = require('../models/news');
var Events = require('../models/events');

function getNews(params, done){
  return News.find(params, function(err, res){
    if (err) done(err);
    done(null, res);
  });
}

function getEvents(params, done){
  return Events.find(params, function(err, res){
    if (err) done(err);
    done(null, res);
  });
}

function createNewsItem(data){
  return new News({
    title: data.title,
    summary: data.summary,
    description: data.description,
    url: data.url || "",
  });
}

function createEventItem(data){
  return new Events({
    title: data.title,
    summary: data.summary,
    description: data.description,
    url: data.url || "",
    date: data.date,
    contact_person: {
      name: data.contact_name || "",
      email: data.contact_email || ""
    }
  });
}

function createNewsItem(data){
  return new News({
    title: data.title,
    summary: data.summary,
    description: data.description,
    url: data.url || "",
  });
}

/* GET all the news / events */
router.get('/', function(req, res, next){
  // return all news and events items togethor
  // use different icons in the UI?
  // merge the results, sorted by meta.posted_at date
  async.parallel([
    function(callback){
      getNews({}, callback);
    }, function(callback){
      getEvents({}, callback);
    }], function(err, results){
    if (err) throw Error(err);

    // merge the arrays of results and sort them by date posted
    console.log(_.flatten(results));
    results = _.sortBy(_.flatten(results), function(o){ return -o.meta.posted_at; });
    res.send(results);
  });
});

/* GET all the news / event item */
router.get('/:permalink', function(req, res, next){
  var permalink = req.params.permalink;
  console.log(permalink);

  async.parallel([
    function(callback){
      getNews({'meta.permalink': permalink}, callback);
    }, function(callback){
      getEvents({'meta.permalink': permalink}, callback);
    }], function(err, results){
    if (err) throw Error(err);

    results = _.flatten(results);
    res.send(results[0] || {});
  });
});


/* POST add a new news / event */
router.post('/', function(req, res, next){
  var data = req.body;
  console.log(data);
  var model = (data.type == 'news') ? createNewsItem(data) : createEventItem(data);
  console.log("***MODEL***");
  console.log(model);

  model.save(function(err, result){
    console.log(err);
    if (err) res.sendStatus(500);
    res.json(model);
  });
  // generate permalink on save in the schema
});

module.exports = router;
