module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('documentsList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./documents-list.directive.html'),
      scope: {
        documents: '=',
        search: '=',
        canEdit: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Documents list directive");

      }
    };
  });

};
