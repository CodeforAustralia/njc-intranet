module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('staffList', function($log, TokenService){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./staff-list.directive.html'),
      scope: {
        staff: '=',
        search: '=',
        canEdit: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Staff list directive");
        $log.log(scope);

        scope.access_token = TokenService.get();
      }
    };
  });

};
