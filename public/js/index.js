// load our plugins and helpers
require('npm/lodash');
require('npm/angular');
require('npm/jquery');
require('npm/angular-aria');
require('npm/angular-animate');
require('npm/angular-cache');
require('npm/angular-file-upload');
require('npm/angular-formly');
require('npm/angular-formly-templates-bootstrap');
require('npm/angular-base64');
require('npm/angular-local-storage');
require('npm/angular-moment');
require('npm/angular-base64-upload');
require('npm/angular-sanitize');
require('npm/angular-spinkit');
require('npm/angular-strap/dist/angular-strap');
require('npm/angular-strap/dist/angular-strap.tpl');
require('npm/angular-toastr');
require('npm/angular-ui-router');
require('npm/angular-material/angular-material.js');
require('npm/angular-material-calendar/angular-material-calendar.js');

require('npm/bootstrap-additions/dist/bootstrap-additions.css');
require('npm/angular-toastr/dist/angular-toastr.css');
// import the extra css we need
require('npm/angular-spinkit/src/angular-spinkit.css');
require('npm/angular-material/angular-material.css');

// create our app
var app = angular.module('njcIntranetApp', [
  'ui.router',
  'ngAnimate',
  'ngAria',
  'angular-cache',
  'angularFileUpload',
  'angularMoment',
  'base64',
  'formly', 'formlyBootstrap',
  'LocalStorageModule',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.typeahead',
  'ngSanitize',
  'toastr',
  'ngMaterial','materialCalendar',
  'naif.base64',
  'angular-spinkit'
]);

// load all our modules and DI the app module
require('./app')(app);
require('./auth')(app);
require('./dashboard')(app);
require('./documents')(app);
require('./events')(app);
require('./feedback')(app);
require('./general')(app);
require('./news')(app);
require('./staff')(app);
//require('./search')(app);
