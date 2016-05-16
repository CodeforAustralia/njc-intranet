module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffEditModalController', function($scope, $state, $log, $rootScope, moment, toastr, StaffService, StaffList, $modal){
    $log.log($scope);
    var vm = this;

    $log.log('StaffEditModalController');

    var modal = $modal({
      title: 'Update in/out status',
      contentTemplate: '/js/partials/staff-edit-status.html',
      show: true,
      scope: $scope,
    });

    $log.log(modal);

    $scope.$on('modal.hide',function(){
      $log.log("HIDING");
      $state.go('app.dashboard');
    });

    $log.log("STAFF LIST");
    vm.staff = [];
    _.each(StaffList.data, function(staff){
      vm.staff.push({name: staff.name, value: staff._id});
    });

    vm.model = {
    };

    vm.fields = {};
    vm.fields.status = [
      {
        key: '_id',
        type: 'select',
        templateOptions: {
          label: 'Staff member',
          required: true,
          options: vm.staff,
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
          label: 'Is the duty worker?',
        }
      },
    ];

    vm.updateStatus = function(){
      $log.log("Update status");
      var model = vm.model.status;
      StaffService.update(vm.model.status._id, vm.model).then(function(){
        toastr.success("Updated status!","Success");
        $scope.$emit('UPDATE_DUTY_WORKER');
      }, function(){
        toastr.error("There was an error updating the status, please refresh and try again","Error");
      });
    };

    function init(){
      $log.log("Loaded the staff new controller");
      $log.log(vm.document);
    }

    init();
  });

};
