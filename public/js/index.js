// load our plugins and helpers
import _ from 'npm/lodash';
import angular from 'npm/angular';
import jQuery from 'npm/jquery';
import bootstrap from 'npm/bootstrap';
import angularAria from 'npm/angular-aria';
import angularAnimate from 'npm/angular-animate';
import angularCache from 'npm/angular-cache';
import angularUpload from 'npm/angular-file-upload';
import formly from 'npm/angular-formly';
import formlyBootstrap from 'npm/angular-formly-templates-bootstrap';
import angularBase64 from 'npm/angular-base64';
import angularLocalStorage from 'npm/angular-local-storage';
import angularMoment from 'npm/angular-moment';
import angularBase64Upload from 'npm/angular-base64-upload';
import angularSanitize from 'npm/angular-sanitize';
import angularStrap from 'npm/angular-strap/dist/angular-strap.min';
import angularStrapTpl from 'npm/angular-strap/dist/angular-strap.tpl.min';
import angularToastr from 'npm/angular-toastr';
import angularRouter from 'npm/angular-ui-router';
import angularMaterial from 'npm/angular-material/angular-material.min.js';
import angularMaterialCalendar from 'npm/angular-material-calendar/angular-material-calendar.min.js';


//require('npm/angular-material');
//require('npm/angular-material-calendar/angular-material-calendar.min.js');
//require('npm/angular-strap/dist/angular-strap.tpl.min.js');
//require('npm/angular-strap/dist/angular-strap.tpl.min.js');
require('npm/angular-strap/dist/angular-strap.tpl.min.js');

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
