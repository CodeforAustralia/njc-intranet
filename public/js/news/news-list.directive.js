module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('newsList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./news-list.directive.html'),
      scope: {
        news: '='
      },
      link: function(scope, elem, attrs){
        $log.log("News summary directive");

      }
    };
  });

};
