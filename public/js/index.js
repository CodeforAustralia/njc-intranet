// load our plugins and helpers
import _ from 'npm/lodash';
import angular from 'npm/angular';
import jQuery from 'npm/jquery';
import bootstrap from 'npm/bootstrap';
import angularCache from 'npm/angular-cache';
import angularUpload from 'npm/angular-file-upload';
import formly from 'npm/angular-formly';
import formlyBootstrap from 'npm/angular-formly-templates-bootstrap';
import angularBase64 from 'npm/angular-base64';
import angularLocalStorage from 'npm/angular-local-storage';
import angularMoment from 'npm/angular-moment';
import angularSanitize from 'npm/angular-sanitize';
import angularStrap from 'npm/angular-strap';
import angularToastr from 'npm/angular-toastr';
import angularRouter from 'npm/angular-ui-router';
require('npm/angular-strap/dist/angular-strap.tpl.min.js');

// create our app
var app = angular.module('njcIntranetApp', [
  'ui.router',
  'angular-cache',
  'angularFileUpload',
  'angularMoment',
  'base64',
  'formly', 'formlyBootstrap',
  'LocalStorageModule',
  'mgcrea.ngStrap',
  'ngSanitize',
  'toastr'
]);

// load all our modules and DI the app module
require('./app')(app);
require('./general')(app);
require('./auth')(app);
require('./dashboard')(app);
require('./documents')(app);
require('./feedback')(app);
require('./news-events')(app);
require('./staff')(app);
require('./search')(app);
