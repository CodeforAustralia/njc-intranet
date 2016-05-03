module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('njcNewsUpdates', function($log, Constants){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: Constants.urls.public+'/js/partials/news-updates.directive.html',
        scope: {
          news: '='
        },
        link: function(scope, elem, attrs){
          $log.log("News updates directive");
          $log.log(scope);
        }
      };
    });

};
