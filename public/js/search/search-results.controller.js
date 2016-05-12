module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('SearchResultsController', function($scope, $log, $rootScope, Results, $stateParams, $state){
    $log.log($scope);

    var vm = this;

    vm.params = $stateParams;
    vm.data = Results.data[0];

    function init(){
      $log.log("Loaded the search results controller");
      $log.log(vm);
    }

    init();
  });

};
