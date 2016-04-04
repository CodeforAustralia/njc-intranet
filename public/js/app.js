(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .config(function($urlRouterProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/dashboard');
      $urlRouterProvider.when('/', '/dashboard');
    })
    .config(function (CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    })
    .controller('AppController', function ($log, $scope, $rootScope) {
      var main = this;

      $rootScope.user = {
        name: ""
      };

      $log.log("AppController loading");
    })
    .config(stateConfig)
    .constant('_', window._)
    .run(function($log, $rootScope, $location){
      $log.log("Running the app");
    });

  function stateConfig($stateProvider){
    $stateProvider
  	.state('login', { // state for showing all movies
  		url: '/',
  		templateUrl: 'js/partials/login.html',
  		controller: 'LoginController',
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('dashboard', {
  		url: '/dashboard',
  		templateUrl: 'js/partials/dashboard.html',
  		controller: 'DashboardController',
      controllerAs: 'vm',
      resolve: {
        DutyWorker: function(StaffService){
          return StaffService.dutyWorker();
        }
      }
  	})
    .state('staff', {
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        Teams: function(TeamService){
          return TeamService.all();
        }
      }
  	})
    .state('staff.index', {
  		url: '/staff',
  		templateUrl: 'js/partials/staff-index.html',
  		controller: 'StaffIndexController',
      controllerAs: 'vm',
      resolve: {
        staffList: function(StaffService){
          return StaffService.all();
        }
      }
  	})
    .state('staff.new', {
  		url: '/staff/new',
  		templateUrl: 'js/partials/staff-new.html',
  		controller: 'StaffNewController',
      controllerAs: 'vm',
      resolve: {
      }
  	})
    .state('staff.update', {
  		url: '/staff/:id',
  		templateUrl: 'js/partials/staff-update.html',
  		controller: 'StaffUpdateController',
      controllerAs: 'vm',
      resolve: {
        StaffMember: function($stateParams, StaffService){
          return StaffService.get($stateParams.id);
        }
      }
  	})
    .state('documents', {
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        Categories: function(CategoryService){
          return CategoryService.all();
        },
        Topics: function(TopicService){
          return TopicService.all();
        }
      }
  	})
    .state('documents.index', {
  		url: '/documents',
  		templateUrl: 'js/partials/documents-index.html',
  		controller: 'DocumentsIndexController',
      controllerAs: 'vm',
      resolve: {
        documentList: function(DocumentService){
          return DocumentService.all();
        }
      }
  	})
    .state('documents.view', {
  		url: '/documents/:id',
  		templateUrl: 'js/partials/documents-view.html',
  		controller: 'DocumentsViewController',
      controllerAs: 'vm',
      resolve: {
        documentItem: function($log, $stateParams, DocumentService){
          $log.log($stateParams);
          return DocumentService.get($stateParams.id);
        }
      }
  	})
    .state('documents.new', {
  		url: '/documents/new',
  		templateUrl: 'js/partials/documents-new.html',
  		controller: 'DocumentsNewController',
      controllerAs: 'vm',
      resolve: {

      }
  	});
  }

})();
