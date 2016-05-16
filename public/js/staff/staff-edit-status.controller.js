module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffStatusUpdateController', function($scope, $log, $rootScope, moment, toastr, StaffService, $modal, StaffList){
    $log.log($scope);
    var vm = this;

    $log.log("STAFF LIST");
    $log.log(StaffList);

    vm.staff_list = StaffList.data;

    vm.fields = {};
    vm.fields.status = [
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
      $log.log(vm.model.status);
      //var model = _.extend(vm.model.details, vm.model.status);
      StaffService.update(vm.staff._id, model).then(function(){
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
