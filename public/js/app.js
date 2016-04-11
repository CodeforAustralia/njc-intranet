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

      $rootScope.duty_worker = {};

      $rootScope.$on('UPDATE_DUTY_WORKER', function(){
        $log.log("Caught - UPDATE_DUTY_WORKER");
        $rootScope.$broadcast('UPDATE_DUTY_WORKER');
      });

      $log.log("AppController loading");
    })
    .config(stateConfig)
    .constant('_', window._)
    .run(function($log, $rootScope, $location, $state, AuthService){
      $log.log("Running the app");
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AuthService.isAuthenticated()){
          // User isn’t authenticated
          $state.transitionTo("auth.login");
          event.preventDefault();
        }
      });
    });

  function stateConfig($stateProvider){
    $stateProvider
    .state('auth', {
      abstract: true,
      template: "<ui-view />"
    })
  	.state('auth.login', { // state for showing all movies
  		url: '/login',
  		templateUrl: 'js/partials/login.html',
  		controller: 'LoginController',
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('auth.logout', { // state for showing all movies
  		url: '/login',
  		controller: function($scope, AuthService, $state){
        AuthService
          .logout()
          .then(function(){
            $state.go('auth.login');
          });
      },
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('app', {
      templateUrl: 'js/partials/layout.html',
      authenticate : true,
      resolve: {
        Teams: function(TeamService){
          return TeamService.all();
        }
      }
    })
    .state('app.dashboard', {
  		url: '/dashboard',
      authenticate : true,
      views: {
        "content": {
          templateUrl: 'js/partials/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
        },
        "modal": {
          template: ""
        }
      },
      resolve: {
        DutyWorker: function(StaffService){
          return StaffService.dutyWorker();
        }
      }
  	})
    .state('app.dashboard.modal-update-status', {
  		url: '/status',
      authenticate : true,
      resolve: {
        StaffList: function(StaffService){
          return StaffService.all();
        }
      },
      views: {
        "content": {},
        "modal@app": {
          controller: 'StaffUpdateModalController',
          controllerAs: 'vm',
        }
      }
    })
    .state('app.staff', {
      abstract: true,
      authenticate : true,
      views: {
        "content": {
          template: '<ui-view/>',
        }
      },
      resolve: {
        Teams: function(TeamService){
          return TeamService.all();
        }
      }
  	})
    .state('app.staff.index', {
  		url: '/staff',
  		templateUrl: 'js/partials/staff-index.html',
  		controller: 'StaffIndexController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        StaffList: function(StaffService){
          return StaffService.all();
        }
      }
  	})
    .state('app.staff.new', {
  		url: '/staff/new',
  		templateUrl: 'js/partials/staff-new.html',
  		controller: 'StaffNewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
      }
  	})
    .state('app.staff.update', {
  		url: '/staff/:id',
  		templateUrl: 'js/partials/staff-update.html',
  		controller: 'StaffUpdateController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        StaffMember: function($stateParams, StaffService){
          return StaffService.get($stateParams.id);
        }
      }
  	})
    .state('app.documents', {
      abstract: true,
      authenticate : true,
      views: {
        "content": {
          template: '<ui-view/>',
        }
      },
      resolve: {
        Categories: function(CategoryService){
          return CategoryService.all();
        },
        Topics: function(TopicService){
          return TopicService.all();
        }
      }
  	})
    .state('app.documents.index', {
  		url: '/documents',
  		templateUrl: 'js/partials/documents-index.html',
  		controller: 'DocumentsIndexController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        documentList: function(DocumentService){
          return DocumentService.all();
        }
      }
  	})
    .state('app.documents.view', {
  		url: '/documents/:id',
  		templateUrl: 'js/partials/documents-view.html',
  		controller: 'DocumentsViewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        documentItem: function($log, $stateParams, DocumentService){
          $log.log($stateParams);
          return DocumentService.get($stateParams.id);
        }
      }
  	})
    .state('app.documents.new', {
  		url: '/documents/new',
  		templateUrl: 'js/partials/documents-new.html',
  		controller: 'DocumentsNewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {

      }
  	});
  }

})();
