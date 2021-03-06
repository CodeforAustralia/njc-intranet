module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('LoginController', function($scope, $log, $rootScope, $modal, $state, AuthService, AlertService, ClientService){
    $log.log("Starting the LoginController");
    var vm = this;
    //vm.model = new Entry(); // create a new instance of the entry model
    vm.model = {};

    // array of our form fields needed
    vm.fields = [{
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your username',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
      }
    }];

    vm.submit = function(){
      $log.log("Submitting login attempt");
      AuthService
        .attempt(vm.model.username, vm.model.password)
        .then(function(resp){
          // If login is successful, redirect to the users state
          $log.log("LOGGED IN SUCCESSFULLY");
          $log.log(resp);
          var user = resp.data.user[0];
          AlertService.success("Successfully logged in");
          // cache the client in localstorage / sessions / cookies
          ClientService.set({'username': vm.model.username, 'is_admin': user.is_admin});
					$state.go('dashboard');
        }, function(err){
          $log.log("Error");
          $log.log(err);
          AlertService.error("Error logging in!");
        });
    };

    function init(){
      $log.log("Loaded the login controller");
    }

    init();
  });

};
