module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('bannerImage', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        template: require('./banner-image.directive.html'),
        scope: {
          imageUrl: '='
        },
        link: function(scope, elem, attrs){
          $log.log("Banner image directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

};
