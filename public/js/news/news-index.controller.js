module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('NewsIndexController', function($scope, $log, NewsList, ClientService){
    $log.log("Loading news index controller");

    var vm = this;
    vm.is_admin = ClientService.isAdmin();
    vm.news = NewsList.data;

    function init(){
      $log.log("Loaded the news index controller");
    }

    init();
  });

};
