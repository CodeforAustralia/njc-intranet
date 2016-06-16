module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('EventsItemController', function($scope, $log, EventItem){
    $log.log("Loading event item controller");

    var vm = this;
    vm.event = EventItem.data;

    function init(){
      $log.log("Loaded the event item controller");
    }

    init();
  });

};
