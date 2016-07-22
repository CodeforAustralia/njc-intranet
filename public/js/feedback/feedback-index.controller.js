module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('FeedbackIndexController', function($scope, $log, moment, FeedbackList, ClientService, TokenService){
    var vm = null;
    vm = this;
    vm.is_admin = ClientService.isAdmin();

    vm.currentToken = function(){
      return TokenService.get();
    };

    function init(){
      $log.log("Loaded the feedback index controller");

      // TODO: Refactor this mess
      vm.content = [];
      // Getting rid of groupings for now figure that out later
      $log.log("FEEDBACK LIST");
      $log.log(FeedbackList);
      vm.content = FeedbackList.data;
    }

    init();
  });

};
