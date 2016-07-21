module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('globalHeader', function($log, $window, TokenService){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./global-header.directive.html'),
      scope: {
        data: '=',
        query: '=',
        hideSearch: '@'
      },
      controller: GlobalHeaderController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, elem, attrs){
        $log.log("global header directive");
        $log.log(scope);
        $log.log(elem);
        $log.log(attrs);
        scope.hideSearch = scope.hideSearch || false;
        //scope.searchData = scope.searchData || [];

        scope.is_authenticated = TokenService.isAuthenticated();
        $log.log("CHECK AUTH");
        $log.log(scope);

        scope.$on('$typeahead.select', function(event, value, index, elem){
          console.log("SELECTED");
          console.log(event); // event properties
          console.log(value); // value of select
          console.log(index); // index of selected value in dropdown
          console.log(elem);  // properties of calling element ($id to get the id)

          // show the search results
          $log.log("Loading " + value.url);
          $window.location.href = value.url;
          //$state.go('app.search.results', {type: value.type, id: value._id});
        });
      }
    };
  });

};

/*@ngInject*/
function GlobalHeaderController($log, TokenService){
  var vm = this;

  vm.currentToken = function(){
    return TokenService.get();
  };
}
