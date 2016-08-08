// Seeds the database with some fake data
var faker = require('faker');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var chalkColours = require('./chalk-colours');
var Feedback = require('./models/feedback');
var Events = require('./models/events');
var News = require('./models/news');
var Staff = require('./models/staff');
var Documents = require('./models/documents');
var db = null, dbName = "njc_intranet";

var FEEDBACK_TYPES = ['bug', 'enhancement', 'im not sure'];
var DOCUMENT_TYPES = ['Policies', 'Procedures', 'Forms', 'Supporting documents'];
var DOCUMENT_CATEGORIES = ['All documents', 'Finance', 'HR', 'OH&S'];

function clearAllCollections(){
  var colls = [Feedback, Documents, News, Events, Staff];
  return Promise.all([
    clearCollection(Feedback),
    clearCollection(Documents),
    clearCollection(News),
    clearCollection(Staff),
    clearCollection(Events)
  ]);
}

function clearCollection(coll){
  return new Promise(function(resolve, reject){
    coll.remove({}, function(err){
      if (err) reject(err);
      resolve("Cleared the collection - " + coll.modelName);
    })
  });
}

function newFeedback(i){
  return {
    type: faker.random.arrayElement(FEEDBACK_TYPES),
    message: faker.random.words(faker.random.number({min: 10, max: 25})),
  }
}

function seedFeedback(){
  return seedCollection(Feedback, newFeedback, 5);
}

function seedCollection(coll, modelFactory, total){
  return new Promise(function(resolve, reject){
    console.log(chalkColours.warning("Seeding " + coll.modelName));
    var max = total || 5;
    var counter = 0;
    var model = {};
    for (var i=0;i<max;i++){
      model = modelFactory(i);
      coll.create(model, function(err, data){
        if (err) reject(err);

        model = null;
        if (Number(counter) == Number(max)-1){
          resolve();
        }
        counter++;
      });
    }
  });
}

function newNews(i){
  return {
    title: faker.random.words(),
    summary: faker.random.words(faker.random.number({min: 5, max: 10})),
    description: faker.random.words(faker.random.number({min: 20, max: 50})),
    url: faker.internet.url(),
    meta: {
      permalink: "/permalink/" + faker.random.word(),
      posted_at: faker.date.future(),
      tags: [faker.random.word(),faker.random.word()]
    }
  }
}

function seedNews(){
  return seedCollection(News, newNews, 5);
}

function newEvents(i){
  var d = newNews();
  d.date = faker.date.future();
  d.location = faker.address.city();
  d.contact_person = {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
  return d;
}

function seedEvents(){
  return seedCollection(Events, newEvents, 5);
}

function newDocuments(){
  return {
    title: faker.random.words(),
    description: faker.random.words(faker.random.number({min: 20, max: 50})),
    extension: faker.system.fileType(),
    local_file: false,
    metadata: {
      group: null,
      show_online: faker.random.boolean(),
      category: faker.random.arrayElement(DOCUMENT_CATEGORIES),
      topic: null,
      type: faker.random.arrayElement(DOCUMENT_TYPES),
      updated_at: faker.date.past(), // last time the file was updated
    },
    location: {
      url: faker.internet.url(),
      created_at: faker.date.past(),
      version: 1,
    },
  }
}

function seedDocuments(){
  return seedCollection(Documents, newDocuments, 10);
}

function newStaff(i){
  return {
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    contact: {
      email: faker.internet.email(),
      phone: faker.random.number({min: 10000000, max: 99999999}),
      mobile: faker.random.number({min: 1000000000, max: 9999999999}),
      ext: faker.random.number({min: 1000, max: 9999}),
    },
    organisation: {
      team: faker.random.word(),
      role: faker.random.words()
    },
    work_schedule: {
      'monday':false,
      'tuesday':false,
      'wednesday':false,
      'thursday':false,
      'friday':false,
    },
    status: {
      in: faker.random.boolean(),
      duty_worker: (i == 0) ? true : false,
      notes: faker.random.words(),
      return_date: null
    },
    last_updated: faker.date.past()
  }
}

function seedStaff(){
  return seedCollection(Staff, newStaff, 10);
}

function finish(db){
  if (db) db.close();
  db = null;
  console.log(chalkColours.success("Finished"));
  process.exit(0);
}

// connect to mongodb
mongoose.connect('mongodb://localhost/' + dbName);
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log(chalkColours.success("Connected to monogodb"));
  console.log(chalkColours.warning("Seeding...."));

  clearAllCollections()
    .then(seedFeedback)
    .then(seedDocuments)
    .then(seedEvents)
    .then(seedNews)
    .then(seedStaff)
    .then(function(){
      finish(db);
    })
    .catch(function(err){
      console.error("There was a problem seeding the database - aborting");
      console.error(err);
      finish(db);
    })
});
