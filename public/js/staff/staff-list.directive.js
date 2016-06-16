module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('staffList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./staff-list.directive.html'),
      scope: {
        staff: '=',
        search: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Staff list directive");

      }
    };
  });

};
