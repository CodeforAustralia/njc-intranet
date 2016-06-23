module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffEditStatusController', function($scope, $log, $rootScope, moment, toastr, StaffService, $modal, StaffList){
    $log.log($scope);
    var vm = this;

    vm.model = {};
    $log.log("STAFF LIST");
    $log.log(StaffList);

    vm.staff_list = _.map(StaffList.data, function(s){
      return {name: s.name, value: s._id, in: s.status.in, duty_worker: s.status.duty_worker, notes: null, return_date: null };
    });

    $log.log(vm.staff_list);

    vm.fields = [
      {
        key: 'staff_member',
        type: 'select',
        templateOptions: {
          label: 'Staff member',
          required: true,
          options: vm.staff_list,
        }
      },
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
          label: 'Is duty worker?',
        }
      },
      {
        key: 'return_date',
        type: 'input',
        templateOptions: {
          label: 'Return date',
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        },
        hideExpression: 'model.in'
      },
      {
        key: 'notes',
        type: 'textarea',
        templateOptions: {
          label: 'Notes',
        }
      }
    ];

    vm.dismiss = function(){
      $log.log("Dismiss");
      // $scope.$dismiss();
    };

    vm.save = function(){
      $log.log("Save");
    };

    function close(){
      vm.$dismiss();
      $state.go('home');
    }


    vm.updateStatus = function(){
      $log.log("Update status");
      $log.log(vm.model);
      //var model = _.extend(vm.model.details, vm.model.status);
      StaffService.updateStatus(vm.model).then(function(){
        vm.model = {};
        toastr.success("Updated status!","Success");
      }, function(){
        toastr.error("There was an error updating the status, please refresh and try again","Error");
      });
    };

    function init(){
      $log.log("Loaded the staff status update controller");
    }

    init();
  });

};
