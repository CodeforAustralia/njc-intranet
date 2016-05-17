module.exports = function(app){
  'use strict';

  /*@ngInject*/
  app.controller('LogoutController', function($scope, $log, $auth, ClientService, VentService){

    function init(){
      AlertService.warning("Logging out");
      ClientService.clear();
      $state.go('auth.login');
    }
    init();
  });

};
