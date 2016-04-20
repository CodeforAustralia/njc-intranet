(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('StaffIndexController', StaffIndexController);

  /*@ngInject*/
  function StaffIndexController($scope, $log, $rootScope, moment, StaffList, Teams){
    $log.log($scope);

    var vm = this;

    vm.staff = StaffList.data;
    vm.duty_worker = findDutyWorker(vm.staff);
    vm.teams = Teams.data;
    vm.counts = {
      total_staff: 0, filtered_staff: 0
    };

    function updateStaffCounts(){
      vm.counts.total_staff = vm.staff.length;
      $log.log(_.find(vm.staff, {'organistation.team': vm.activeTab }));
      var filtered = _.find(vm.staff, 'organistation.team', vm.activeTab);
      vm.counts.filtered_staff = (filtered && filtered.length) ? filtered.length : 0;
    }

    function init(){
      $log.log("Loaded the staff index controller");
      $log.log(vm.staff.data);
      updateStaffCounts();
    }

    function findDutyWorker(staff){
      $log.log("Duty Worker");
      var dw = _.find(staff, {'duty_worker': true});
      $log.log(dw);
      return dw;
    }

    init();
  }

})();
