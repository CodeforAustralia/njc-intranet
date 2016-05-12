module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('listSearch', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        template: require('./list-search.directive.html'),
        scope: {
          'query': '=',
          'placeholder': '@'
        },
        link: function(scope, elem, attrs){
          $log.log("List search directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);

          scope.placeholder = scope.placeholder;          
        }
      };
    });

};
