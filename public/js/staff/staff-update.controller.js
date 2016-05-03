module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffUpdateController', function($scope, $log, $rootScope, moment, toastr, StaffService, Teams, StaffMember){
    $log.log($scope);
    var vm = this;

    $log.log("STAFF MEMBER");
    $log.log(StaffMember);

    vm.staff = StaffMember.data[0];

    // make sure the contact / organistaion fields are present
    vm.staff.contact = vm.staff.contact || {};
    vm.staff.organisation = vm.staff.organisation || {};

    vm.model = {
      details: {
        name: vm.staff.name,
        email: vm.staff.contact.email,
        role: vm.staff.organisation.role || "",
        ext: vm.staff.contact.ext || "",
        phone: vm.staff.contact.phone || "",
        mobile: vm.staff.contact.mobile || "",
        team: vm.staff.organisation.team || ""
      },
      status: vm.staff.status
    };
    //vm.teams = [{name: "Information team", value: "Information team"}, {name: "Client services", value: "Client services"}, {name: "Project innovation team", value: "Project innovation team"}];
    vm.teams = [];
    _.each(Teams.data, function(team, key){
      if (team.value !== '')
        vm.teams.push({name: team.label, value: team.value});
    });

    $log.log("TEAMS");
    $log.log(vm.teams);
    vm.fields = {};
    vm.fields.status = [
      {
        key: 'in',
        type: 'checkbox',
        templateOptions: {
          label: 'Currently in?',
        }
      },
      {
        key: 'duty_worker',
        type: 'checkbox',
        templateOptions: {
          label: 'Is '+vm.staff.name+' the duty worker?',
        }
      },
    ];

    vm.fields.details = [
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

    vm.updateStatus = function(){
      $log.log("Update status");
      $log.log(vm.model.status);
      var model = _.extend(vm.model.details, vm.model.status);
      StaffService.update(vm.staff._id, model).then(function(){
        toastr.success("Updated status!","Success");
      }, function(){
        toastr.error("There was an error updating the status, please refresh and try again","Error");
      });
    };

    vm.updateDetails = function(){
      // submit the form
      $log.log("Update details");
      $log.log(vm.model.details);
      var model = _.extend(vm.model.details, vm.model.status);
      StaffService.update(vm.staff._id, model).then(function(){
        toastr.success("Updated details!","Success");
      }, function(){
        toastr.error("There was an error updating the details, please refresh and try again","Error");
      });
    };

    function init(){
      $log.log("Loaded the staff new controller");
      $log.log(vm.document);
    }

    init();
  });

};
