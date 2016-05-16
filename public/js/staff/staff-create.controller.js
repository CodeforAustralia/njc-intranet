module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffCreateController', function($scope, $log, $rootScope, moment, toastr, StaffService, Teams){
    $log.log($scope);
    var vm = this;

    vm.model = {};
    //vm.teams = [{name: "Information team", value: "Information team"}, {name: "Client services", value: "Client services"}, {name: "Project innovation team", value: "Project innovation team"}];
    vm.teams = [];
    _.each(Teams.data, function(team, key){
      if (team.value !== '')
        vm.teams.push({name: team.label, value: team.value});
    });

    $log.log("TEAMS");
    $log.log(vm.teams);
    vm.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name',
          placeholder: 'Enter a name for the staff member',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email address',
          placeholder: 'Enter a email for the staff member',
          required: true
        }
      },
      {
        key: 'team',
        type: 'select',
        templateOptions: {
          label: 'Select a team',
          placeholder: 'Select a team',
          required: true,
          options: vm.teams
        }
      },
      {
        key: 'role',
        type: 'input',
        templateOptions: {
          label: 'Role',
          placeholder: 'Enter a role for the staff member',
          required: true
        }
      },
      {
        key: 'ext',
        type: 'input',
        templateOptions: {
          label: 'Phone ext number',
          placeholder: 'Enter a phone ext number for the staff member',
          required: false
        }
      },
      {
        key: 'phone',
        type: 'input',
        templateOptions: {
          label: 'Phone number',
          placeholder: 'Enter a phone number for the staff member',
          required: false
        }
      },
      {
        key: 'mobile',
        type: 'input',
        templateOptions: {
          label: 'Mobile number',
          placeholder: 'Enter a mobile number for the staff member',
          required: false
        }
      }
    ];

    vm.submit = function(){
      // submit the form
      $log.log("Submitting the form");
      StaffService.create(vm.model).then(function(){
        toastr.success("New staff member created!","Success");
        vm.model = {};
      }, function(){
        toastr.error("There was an error creating the new staff member, try again","Error");
      });
    };

    function init(){
      $log.log("Loaded the staff new controller");
      $log.log(vm.document);
    }

    init();
  });

};
