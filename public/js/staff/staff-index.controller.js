module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StaffIndexController', function($scope, $log, moment, StaffList, DutyWorker, $location, ClientService){
    $log.log($scope);

    var vm = this;

    $log.log("is admin?");
    vm.is_admin = ClientService.isAdmin();

    var params = $location.search();
    vm.query = params.q || "";
    vm.staff = StaffList.data;
    vm.dutyWorker = DutyWorker.data;
    //vm.teams = Teams.data;
    vm.teams = [];
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
      //updateStaffCounts();
    }

    init();
  });

};
