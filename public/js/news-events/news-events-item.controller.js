module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('NewsEventsItemController', function($scope, $log, NewsEvent){
    $log.log($scope);
    var vm = this;

    $log.log(NewsEvent);
    vm.item = NewsEvent.data;

    function init(){
      $log.log("Loaded the news events item controller");
    }

    init();
  });

};
