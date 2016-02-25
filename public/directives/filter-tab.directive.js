(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('filterTabs', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/filter-tab.directive.html',
        scope: {
          'tabs': '='
        },
        link: function(scope, elem, attrs){
          $log.log("Filter tabs directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

  /*@ngInject*/
  /*function FilterTabDirective(){
    $log.log($scope);

    var vm = this;
    $log.log(documentList);

    vm.categories = [{'title':'All documents', 'active': 'active'}, {'title':'Finance', 'active':''}, {'title':'HR','active':''}, {'title':'OH&S', 'active':''}];
    vm.content = [
      {'title':'Leave', 'documents': [{'title':'Leave form'}, {'title':'Leave procedures'}, {'title':'Leave policy'}]},
      {'title':'Feedback', 'documents': [{'title':'Feedback form'}, {'title':'Feedback procedures'}, {'title':'Feedback policy'}]},
      {'title':'Feedback', 'documents': [{'title':'Feedback form'}, {'title':'Feedback procedures'}, {'title':'Feedback policy'}]},
      {'title':'Feedback', 'documents': [{'title':'Feedback form'}, {'title':'Feedback procedures'}, {'title':'Feedback policy'}]}
    ];

    function init(){
      $log.log("Loaded the documents index controller");
    }

    init();
  }*/

})();
