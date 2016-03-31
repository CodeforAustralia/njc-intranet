var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var documents = require('./routes/documents');
var staff = require('./routes/staff');
var topics = require('./routes/topics');
var categories = require('./routes/categories');
var uploads = require('./routes/uploads');
var seeders = require('./routes/seeders');

var app = express();
// console message colours
var chalk = require('chalk'); // colour our output
var error = chalk.bold.bgRed;
var warning = chalk.bold.bgYellow;
var success = chalk.bold.bgGreen;

// db connection
var db;
var dbName = "njc_intranet";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the static asset path
app.use('/intranet-static', express.static('public'));

app.use('/', routes);
app.use('/users', users);
app.use('/api/staff', staff);
app.use('/api/documents', documents);
app.use('/api/topics', topics);
app.use('/api/categories', categories);
app.use('/uploads', uploads);
app.use('/seeders', seeders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  // connect to mongodb
  mongoose.connect('mongodb://localhost/' + dbName);
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback){
    console.log(success("Connected to monogodb"));
  });
}
else {
  // connect to remote mongodb
  mongoose.connect(process.env.MONGOLAB_URI); // connect to monoglabs
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback){
    console.log(success("Connected to monogodb"));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
