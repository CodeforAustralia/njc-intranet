module.exports = function(app){
  'use strict';
  console.log(app);
  // App bootstrapping + DI
  /*@ngInject*/
  app.config(function($urlRouterProvider){
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
    .constant('_', window._)
    .config(stateConfig)
    //.run(function($log, $rootScope, $location, $state, AuthService, Constants){
    .run(runApp);

  /*@ngInject*/
  function runApp($log, $rootScope, $location, $state, Constants, AuthService){
    $log.log("AuthService");
    $log.log(AuthService);
    $log.log("Constants");
    $log.log(Constants);

    $log.log('location');
    $log.log($location);
    $log.log($location.$$host);

    $log.log("Running the app");
    $log.log("Check auth");
    /*$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isAuthenticated() && $location.$$host != 'localhost'){
        $log.log("Not Authenticated");
        // User isn’t authenticated
        $state.transitionTo("auth.login");
        event.preventDefault();
      }
    });*/
  }

  function stateConfig($stateProvider, Constants){
    $stateProvider
    .state('auth', {
      abstract: true,
      template: "<ui-view />"
    })
  	.state('auth.login', {
  		url: '/login',
  		template: require('./general/login.html'),
  		controller: 'LoginController',
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('auth.logout', {
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
      template: require('./general/layout.html'),
      authenticate : true,
      resolve: {
        Teams: function($log, TeamService){
          $log.log("Resolve teams");
          return TeamService.all();
        }
      }
    })
    .state('app.dashboard', {
  		url: '/dashboard',
      authenticate : true,
      views: {
        "content": {
          template: require('./dashboard/dashboard.html'),
          controller: 'DashboardController',
          controllerAs: 'vm',
        },
        "modal": {
          template: ""
        }
      },
      resolve: {
        DutyWorker: function($log, StaffService){
          $log.log("Duty worker");
          return StaffService.dutyWorker();
        },
        Weather: function(WeatherService){
          return WeatherService.today();
        },
        News: function(NewsService){
          return NewsService.all();
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
  		template: require('./staff/staff-index.html'),
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
  		template: require('./staff/staff-new.html'),
  		controller: 'StaffNewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
      }
  	})
    .state('app.staff.update', {
  		url: '/staff/:id',
  		template: require('./staff/staff-update.html'),
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
        Categories: function(DocumentService){
          return DocumentService.categories();
        },
        Types: function(DocumentService){
          return DocumentService.types();
        }
      }
  	})
    .state('app.documents.index', {
  		url: '/documents',
  		template: require('./documents/documents-index.html'),
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
  		template: require('./documents/documents-view.html'),
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
  		template: require('./documents/documents-new.html'),
  		controller: 'DocumentsNewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {

      }
  	});
  }

};
