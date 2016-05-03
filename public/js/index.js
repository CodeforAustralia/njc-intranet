// create our module
var angular = require('angular');

var app = angular.module('njcIntranetApp', []);
console.log(app);

// load all our modules and DI the app module
require('./general')('app');
require('./dashboard')('app');
require('./documents')('app');
require('./staff')('app');
