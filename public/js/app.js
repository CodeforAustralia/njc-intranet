module.exports = function(app){
  'use strict';
  console.log(app);
  // App bootstrapping + DI
  /*@ngInject*/
  app.config(function($urlRouterProvider, $datepickerProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/dashboard');
      $urlRouterProvider.when('/', '/dashboard');

      angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        modelDateFormat: 'yyyy-MM-dd HH:mm:ss',
        startWeek: 1,
        minDate: new Date(),
        autoclose: true,
      });
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
    //.run(function($log, $rootScope, $location, $state, AuthService){
    .run(runApp);

  /*@ngInject*/
  function runApp($log, $rootScope, $location, $state, AuthService, ClientService){
    $log.log("AuthService");
    $log.log(AuthService);

    $log.log('location');
    $log.log($location);
    $log.log($location.$$host);

    $log.log("Running the app");
    $log.log("Check auth");
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      $log.log(ClientService.isLoggedIn());
      if (toState !== 'auth.login' && toState.authenticate && !ClientService.isLoggedIn() /*&& $location.$$host != 'localhost'*/){
        $log.log("Not Authenticated");
        // User isn’t authenticated
        $state.transitionTo("auth.login");
        event.preventDefault();
      }
    });
  }

  function stateConfig($stateProvider){
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
      /*resolve: {
        Teams: function($log, TeamService){
          $log.log("Resolve teams");
          return TeamService.all();
        }
      }*/
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
        Weather: function($log, WeatherService){
          $log.log("Weather");
          return WeatherService.today();
        },
        NewsEvents: function($log, NewsEventsService){
          $log.log("Getting news");
          return NewsEventsService.all();
        },
        SearchDocuments: function(SearchService){
          return SearchService.documents();
        },
        SearchStaff: function(SearchService){
          return SearchService.staff();
        },
        SearchData: function($log, SearchDocuments, SearchStaff){
          // return an array of all the data
          $log.log(_.flatten(SearchDocuments.data));
          var docs = [];
          _.each(SearchDocuments.data, function(list){
            return docs.push(list);
          });
          docs = _.flatten(docs);
          var data = _.concat(docs, SearchStaff.data);
          $log.log("******DOCS******");
          $log.log(SearchDocuments.data);
          $log.log("******STAFF******");
          $log.log(SearchStaff.data);
          $log.log("Resolving search data");
          $log.log(data);
          // normalize the list for the search tool
          var clean = _.map(data, function(item){
            // check if it is a document or a staff memeber
            $log.log(item);
            if (item.title){
              // document
              return {'title': item.title, _id: item._id, 'type': 'document'};
            }
            else {
              // staff
              return {'title': item.name, _id: item._id, 'type': 'staff'};
            }
          });

          $log.log("******CLEANED******");
          $log.log(clean);
          return clean;
        }
      }
  	})
    .state('app.dashboard.modal-edit-status', {
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
          controller: 'StaffEditModalController',
          controllerAs: 'vm',
        }
      }
    })
    .state('app.dashboard.feedback', {
      url: '/feedback',
      authenticate : true,
      resolve: {
        StaffList: function(StaffService){
          return StaffService.all();
        }
      },
      views: {
        "content": {},
        "modal@app": {
          controller: 'FeedbackFormController',
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
    .state('app.staff.create', {
  		url: '/staff/create',
  		template: require('./staff/staff-create.html'),
  		controller: 'StaffCreateController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
      }
  	})
    .state('app.staff.edit', {
  		url: '/staff/:id/edit',
  		template: require('./staff/staff-edit.html'),
  		controller: 'StaffEditController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        StaffMember: function($stateParams, StaffService){
          return StaffService.get($stateParams.id);
        }
      }
  	})
    .state('app.search', {
      abstract: true,
      authenticate : true,
      views: {
        "content": {
          template: '<ui-view/>',
        }
      },
      resolve: {
      }
  	})
    .state('app.search.results', {
  		url: '/search/:type/:id',
  		template: require('./search/search-results.html'),
  		controller: 'SearchResultsController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        Results: function($log, DocumentService, StaffService, $stateParams){
          $log.log("resolving the search result");
          if ($stateParams.type === 'staff')
            return StaffService.get($stateParams.id);
          else {
            var doc =  DocumentService.get($stateParams.id);
            $log.log(doc);
            return doc;
          }
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
        },
        Groups: function($log, DocumentService){
          $log.log("Document groups");
          $log.log(DocumentService.groups());
          return DocumentService.groups();
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
    .state('app.documents.create', {
  		url: '/documents/create',
  		template: require('./documents/documents-create.html'),
  		controller: 'DocumentsCreateController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
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
    .state('app.documents.edit', {
  		url: '/documents/:id/edit',
  		template: require('./documents/documents-edit.html'),
  		controller: 'DocumentsEditController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        Document: function($log, $stateParams, DocumentService){
          $log.log("Params");
          $log.log($stateParams);
          return DocumentService.get($stateParams.id);
        }
      }
  	})
    .state('app.news', {
      abstract: true,
      authenticate : true,
      views: {
        "content": {
          template: '<ui-view/>',
        }
      },
      resolve: {

      }
  	})
    .state('app.news.index', {
      url: '/news-events',
      template: require('./news-events/news-events-index.html'),
      controller: 'NewsEventsIndexController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        newsEventsList: function($log, NewsEventsService){
          return NewsEventsService.all();
        }
      }
    })
    .state('app.news.edit', {
      url: '/news-events/:id/edit',
      template: require('./news-events/news-events-edit.html'),
      controller: 'NewsEventsEditController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
      }
    })
    .state('app.news.create', {
  		url: '/news-events/create',
  		template: require('./news-events/news-events-create.html'),
  		controller: 'NewsEventsCreateController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
      }
  	})
    .state('app.news.view', {
      url: '/news-events/:permalink',
      template: require('./news-events/news-events-view.html'),
      controller: 'NewsEventsViewController',
      controllerAs: 'vm',
      authenticate : true,
      resolve: {
        NewsEvent: function($stateParams, NewsEventsService){
          return NewsEventsService.byPermalink($stateParams.permalink);
        }
      }
    });
  }

};
