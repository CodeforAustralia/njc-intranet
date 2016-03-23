(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('StaffIndexController', StaffIndexController);

  /*@ngInject*/
  function StaffIndexController($scope, $log, $rootScope, moment, staffList){
    $log.log($scope);

    var vm = this;

    vm.staff = staffList.data;
    vm.duty_worker = findDutyWorker(vm.staff);
    vm.teams = [
      {'label':'All staff', 'value':'', 'active': 'active'},
      {'label':'Client services', 'value':'Client services', 'active':''},
      {'label':'Information team', 'value':'Information team', 'active':''},
      {'label':'Project innovation team','value':'Project innovation team','active':''}
    ];

    function init(){
      $log.log("Loaded the staff index controller");
      $log.log(vm.staff.data);
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
