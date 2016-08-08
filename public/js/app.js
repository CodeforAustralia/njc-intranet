module.exports = function(app){
  'use strict';
  console.log(app);
  // App bootstrapping + DI
  /*@ngInject*/
  app.config(function($urlRouterProvider, $datepickerProvider, $typeaheadProvider, $httpProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/dashboard');
      $urlRouterProvider.when('/', '/dashboard');

      console.log("CONFIG INTERCEPTOR");
      //console.log(AuthInterceptorProvider);

      angular.extend($typeaheadProvider.defaults, {
        animation: 'am-fade',
        minLength: 2,
        limit: 8
      });

      // add the http interceptor
      $httpProvider.interceptors.push('AuthInterceptor');
      angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        modelDateFormat: 'yyyy-MM-dd HH:mm:ss',
        startWeek: 1,
        minDate: new Date(),
        autoclose: true,
        iconLeft: 'fa fa-angle-double-left',
        iconRight: 'fa fa-angle-double-right'
      });
    })
    .config(function (CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    })
    .controller('AppController', function ($log, $scope, $rootScope, ClientService) {
      var main = this;

      $log.log("AppController");
    })
    .constant('_', window._)
    //.config(stateConfig)
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
    // check if the current client is an admin

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      //$log.log(ClientService.isLoggedIn());
      /*if (toState !== 'auth.login' && toState.authenticate && !AuthService.isAuthenticated()){
        $log.log("Not Authenticated");
        // User isn’t authenticated
        $state.transitionTo("auth.login");
        event.preventDefault();
      }

      // check that the state isnt for admin only
      if (toState.admin && !ClientService.isAdmin()){
        // User isn’t authenticated
        $state.transitionTo("auth.login");
        event.preventDefault();
      }*/
    });
  }

};
