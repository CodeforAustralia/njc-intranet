module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('EventsIndexController', function($scope, $log, EventsList, ClientService){
    $log.log("Loading events index controller");

    var vm = this;
    vm.is_admin = ClientService.isAdmin();
    vm.events = EventsList.data;

    function init(){
      $log.log("Loaded the events index controller");
    }

    init();
  });

};
