(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('HomeController', HomeController);

  /*@ngInject*/
  function HomeController($scope, $log, $rootScope, moment){

    let vm = this;

    console.log(moment);

    vm.now = getToday();

    vm.announcements = [
      {'title': 'Announcement 1', 'summary': 'Lorem ipsum dolor sit amet, posse scaevola ei pri, nec ne aperiam oblique. In nam epicuri menandri, eu nibh gubergren urbanitas sea, per no ubique fuisset insolens. Zril reformidans te cum, pri commune definiebas cu. Ei lorem virtute nec. Alii ipsum convenire ne pro, cu has error docendi deseruisse, brute tantas pertinacia has te.'},
      {'title': 'Announcement 2', 'summary': 'Blandit torquatos adversarium eum cu, usu id scaevola expetenda, his ad debet fabulas complectitur. Pro ex cetero splendide. Sit an eius partem, et ius amet choro mentitum. Cum et nullam invenire. Prima discere id vis, quo tale assum iusto ei.'},
      {'title': 'Announcement 3', 'summary': 'Ei alia alterum legimus vel. Sed lorem suavitate id. Vis et quem esse nonumes, qui quando disputando conclusionemque te. Decore nemore duo cu. Qui an appareat oporteat. Mea et facilisi convenire reformidans.'}
    ];

    vm.duty_worker = {
      name: 'Ezekiel Kigbo',
      email: 'hi@eakigbo.me',
      phone: '0400111222'
    };

    vm.current_user = {
      status: 'Out',
    };

    $log.log(vm.now);

    function getToday(){
      const now = new moment();
      //console.log(now);
      return {
        day_of_the_week: now.format('dddd'),
        time: now.format('hh:mm A'),
        date: now.format('MMMM D, YYYY'),
      };
    }

    function init(){
      $log.log("Loaded the home controller");
    }

    init();
  }

})();
