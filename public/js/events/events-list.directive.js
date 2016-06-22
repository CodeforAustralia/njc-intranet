module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('eventsList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./events-list.directive.html'),
      scope: {
        events: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Events list directive");
        scope.events = _.orderBy(scope.events, ['meta.posted_at'], ['desc']);
      }
    };
  });

};
