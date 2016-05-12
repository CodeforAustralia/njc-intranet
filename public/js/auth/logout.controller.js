module.exports = function(app){
  'use strict';

  /*@ngInject*/
  app.controller('LogoutController', function($scope, $log, $auth, ClientService, VentService){

    function init(){
      AlertService.warning("Logging out");

      $auth
        .logout()
        .then(function(){
          $log.log("logged out");
      		AlertService.success("Successfully logged out");
      		ClientService.clear();
        });

    }
    init();
  });

};
