module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('loadingIndicator', function($rootScope) {
    return {
      restrict: 'E',
      template: require('./loading-indicator.directive.html'),
      replace: true,
      link: function(scope, elem, attrs) {
        scope.isStateLoading = false;

        $rootScope.$on('$stateChangeStart', function() {
          scope.isStateLoading = true;
        });

        $rootScope.$on('$stateChangeSuccess', function() {
          scope.isStateLoading = false;
        });
      }
    };
  });
  
}
