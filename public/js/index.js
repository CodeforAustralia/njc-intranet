// load our plugins and helpers
import _ from 'npm/lodash';
import angular from 'npm/angular';
import jQuery from 'npm/jquery';
import bootstrap from 'npm/bootstrap';
import angularCache from 'npm/angular-cache';
import angularUpload from 'npm/angular-file-upload';
import formly from 'npm/angular-formly';
import formlyBootstrap from 'npm/angular-formly-templates-bootstrap';
import angularMoment from 'npm/angular-moment';
import angularSanitize from 'npm/angular-sanitize';
import angularStrap from 'npm/angular-strap';
import angularToastr from 'npm/angular-toastr';
import angularRouter from 'npm/angular-ui-router';

// create our app
var app = angular.module('njcIntranetApp', [
  'ui.router',
  'ngSanitize',
  'angular-cache',
  'mgcrea.ngStrap',
  'angularMoment',
  'formly', 'formlyBootstrap',
  'angularFileUpload',
  'toastr'
]);

// load all our modules and DI the app module
require('./app')(app);
require('./general')(app);
require('./dashboard')(app);
require('./documents')(app);
require('./staff')(app);
