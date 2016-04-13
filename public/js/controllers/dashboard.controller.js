(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('DashboardController', DashboardController);

  /*@ngInject*/
  function DashboardController($scope, $log, $rootScope, moment, DutyWorker, StaffService){
    $log.log("Loading dashboard controller");

    var vm = this;

    $log.log(moment);
    $log.log(DutyWorker);

    vm.duty_worker = !_.isUndefined(DutyWorker.data[0]) ? DutyWorker.data[0] : null;
    vm.news = [
      {"posted": Date.now(), "subject":"News item 1", "permalink":"/news/1"},
      {"posted": Date.now(), "subject":"News item 2", "permalink":"/news/2"},
      {"posted": Date.now(), "subject":"News item 3", "permalink":"/news/3"},
      {"posted": Date.now(), "subject":"News item 4", "permalink":"/news/4"},
      {"posted": Date.now(), "subject":"News item 5", "permalink":"/news/5"},
    ];
    vm.now = getToday();

    $rootScope.$on('UPDATE_DUTY_WORKER', updateDutyWorker);

    function updateDutyWorker(){
      $log.log("Update the duty worker");
      StaffService
        .dutyWorker()
        .then(function(worker){
          $log.log(worker);
          vm.duty_worker = worker.data[0];
        });
    }

    /*vm.announcements = [
      {'title': 'Announcement 1', 'summary': 'Lorem ipsum dolor sit amet, posse scaevola ei pri, nec ne aperiam oblique. In nam epicuri menandri, eu nibh gubergren urbanitas sea, per no ubique fuisset insolens. Zril reformidans te cum, pri commune definiebas cu. Ei lorem virtute nec. Alii ipsum convenire ne pro, cu has error docendi deseruisse, brute tantas pertinacia has te.'},
      {'title': 'Announcement 2', 'summary': 'Blandit torquatos adversarium eum cu, usu id scaevola expetenda, his ad debet fabulas complectitur. Pro ex cetero splendide. Sit an eius partem, et ius amet choro mentitum. Cum et nullam invenire. Prima discere id vis, quo tale assum iusto ei.'},
      {'title': 'Announcement 3', 'summary': 'Ei alia alterum legimus vel. Sed lorem suavitate id. Vis et quem esse nonumes, qui quando disputando conclusionemque te. Decore nemore duo cu. Qui an appareat oporteat. Mea et facilisi convenire reformidans.'}
    ];

    vm.duty_worker = {
      name: 'Ezekiel Kigbo',
      email: 'ezekiel@codeforaustralia.org',
      phone: '0400111222'
    };

    vm.current_user = {
      status: 'Out',
    };

    $log.log(vm.now);*/

    function getToday(){
      var now = new moment();
      //console.log(now);
      return {
        day_of_the_week: now.format('dddd'),
        time: now.format('hh:mm A'),
        date: now.format('MMMM D, YYYY'),
      };
    }

    function init(){
      $log.log("Loaded the dashboard controller");
    }

    init();
  }

})();
