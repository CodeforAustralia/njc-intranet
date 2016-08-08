var _ = require('lodash');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var mimetypes = require('mime-types');
var Documents = require('../models/documents');
var Groups = require('../models/document-groups');

/* GET a document by its id */
router.get('/:id/file', function(req, res, next){
  var id = String(req.params.id);
  // find each person with a last name matching 'Ghost'
  var q = Documents.findOne({ _id: id });

  // execute the query at a later time
  q.exec(function(err, doc) {
    if (err) return res.sendStatus(404);

    // return the file
    var firstVer = (typeof doc.revision[0] !== 'undefined') ? doc.revision[0] : doc.revision;
    var buffer = fs.readFileSync("./" + firstVer.path);
    var content_type = mimetypes.contentType(doc.extension);
    if (content_type){
      console.log(content_type);
      res.set('Content-Type', content_type);
      res.set('Content-Disposition', 'inline');
      res.send(buffer);
    }
    else {
      return res.sendStatus(500).end();
    }
  });
});


/* GET a single document */
router.get('/:id', function(req, res, next){
  // get the documents details
  var q = Documents.findOne({_id: req.params.id});

  q.exec(function(err, doc){
    // 404 if we cant find it
    if (err) return res.sendStatus(404);

    // return it if we find it
    return res.json(doc);
  });
});

/* GET all the documents */
router.get('/', function(req, res, next){
  // find each person with a last name matching 'Ghost'
  var q = Documents.find();

  // execute the query at a later time
  q.exec(function (err, docs) {
    if (err) return handleError(err);

    docs = cleanupDocLocations(docs);
    console.log(docs);

    //groupDocuments(docs)
    //.then(function(results){
    res.json(docs);
    //});
  });
});

/* POST - create a single document */
router.post('/', function(req, res, next){
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");
  // find each person with a last name matching 'Ghost'
  var doc = {
    title: req.body.title,
    description: req.body.description,
    local_file: req.body.local_file || null,
    metadata: {
      category: req.body.category,
      type: req.body.type,
      updated_at: new Date(),
      show_online: req.body.show_online
    },
    location: {url: req.body.url}
  };

  // get the group from the params and either find the id, or create a new one
  /*findOrCreateGroup(req.body.group)
    .then(function(group){
      // uhhh - shouldnt nest promises
      console.log("Group for the doc fetched");
      console.log(id);
      console.log(doc);
      console.log(group);*/
    createDocument(doc)
      .then(function(new_doc){
        // send the response
        console.log("Sending the response");
        console.log(new_doc);
        return res.json(new_doc);
      })
      .catch(function(err){
        return res.status(500).send({
          success: false,
          message: 'An error occured'
        });
      });
    /*})
    .catch(function(err){
      throw Error(err);
    });*/
});

/* PUT update a document */
router.put("/:id", function(req, res, next){
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");  
  // should create a new version when the url changes
  var id = req.params.id;

  // find each person with a last name matching 'Ghost'
  var doc = {
    title: req.body.title,
    description: req.body.description,
    local_file: req.body.local_file || null,
    metadata: {
      category: req.body.category,
      type: req.body.type,
      updated_at: new Date(),
      show_online: req.body.show_online
    },
    location: {url: req.body.location}
  };

  // get the group from the params and either find the id, or create a new one
  /*findOrCreateGroup(req.body.group)
    .then(function(group){
      // uhhh - shouldnt nest promises
      console.log("Group for the doc fetched");
      console.log(id);
      console.log(doc);
      console.log(group);*/
      updateDocument(id, doc)
      .then(function(doc){
        // send the response
        console.log("Sending the response");
        console.log(doc);
        return res.json(doc);
      })
      .catch(function(err){
        console.log(err);
        return res.status(500).send({
          success: false,
          message: 'An error occured'
        });
      });
    /*})
    .catch(function(err){
      throw Error(err);
    });*/
});

function cleanupDocLocations(arr){
  // fixes the dropbox links, turns them into direct links
  return _.map(arr, function(item){
    if (typeof item.location.url !== 'undefined' && item.location.url !== ''  && item.location.url !== null
      && item.location.url.indexOf("?dl=0") > -1 && item.location.url.indexOf("www.dropbox.com") > -1){
      item.location.url = item.location.url.replace('?dl=0', '?dl=1');
    }
    return item;
  });
}

function createDocument(doc){
  //console.log("Updating the doc");
  //console.log(doc);
  return new Promise(function(resolve, reject){
    // execute the query at a later time
    //doc.metadata.group = group._id; // set the group id, update the document now
    console.log("Promise");
    Documents.create(doc, function(err, res){
      console.log("Created");
      console.log(err);
      if (err) reject(err);
      // update the group assignment

      console.log(res);
      console.log(doc);
      resolve(res);
    });
  });
}

function updateDocument(id, doc){
  console.log("Updating the doc");
  console.log(doc);
  return new Promise(function(resolve, reject){
    // execute the query at a later time
    //doc.metadata.group = group._id; // set the group id, update the document now
    Documents.update({'_id': id}, doc, function(err, res){
      console.log("Updating");
      if (err) reject(err);
      // update the group assignment
      resolve(doc);
    });
  });
}

function getDocumentGroups(){
  // get all the groups into a key value pair
  return new Promise(function(resolve, reject){
    Groups.find({}, function(err, g){
      if (err) reject(err);
      var group_names = [];

      _(g)
        .sortBy(['title'])
        .map(function(group){
          console.log(group);
          group_names[group._id] = group.title;
        })
        .value();

      resolve(group_names);
    });
  });
}

// group the array of documents passed in by their group name
function groupDocuments(docs){
  return new Promise(function(resolve, reject){
    getDocumentGroups()
    .then(function(groupnames){
      var gs = _.groupBy(docs, function(item){
        return groupnames[item.metadata.group] || '';
      });

      resolve(gs);
    })
    .catch(function(err){
      return res.status(500).send({
        success: false,
        message: 'An error occured'
      });
    });
  });
}

// find the group for the document or create a new one
function findOrCreateGroup(title){
  return new Promise(function(resolve, reject){
    //console.log("Creating / fetching the group " + title);
    if (!title) title = null; // set it to null
    Groups.findOne({title: title}, function(err, res){
      if (err) reject(err);

      if (res) resolve(res);
      else {
        var g = new Groups({ title: title });
        g.save(function(err, new_group){
          if (err) reject(err);
          resolve(new_group);
        });
      }
    });
  });
}

module.exports = router;
