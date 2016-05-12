module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DashboardController', function($scope, $log, $rootScope, moment, StaffService, DocumentService, DutyWorker, News, Weather, SearchData, $typeahead, $state){
    $log.log("Loading dashboard controller");

    var vm = this;

    $log.log("Search data");
    $log.log(SearchData);
    vm.search_query = "";
    vm.options = SearchData;

    vm.duty_worker = (!_.isUndefined(DutyWorker) && !_.isUndefined(DutyWorker.data)) ? DutyWorker.data[0] : {};
    vm.news = News.data;
    vm.weather = Weather.data;
    vm.now = getToday();

    $scope.$on('$typeahead.select', function(event, value, index, elem){
      console.log("SELECTED");
      console.log(event); // event properties
      console.log(value); // value of select
      console.log(index); // index of selected value in dropdown
      console.log(elem);  // properties of calling element ($id to get the id)

      // show the search results
      $state.go('app.search.results', {type: value.type, id: value._id});
    });

    vm.selected = function(event){
      $log.log("SELECTED");
      $log.log(event);
    };


    $rootScope.$on('UPDATE_DUTY_WORKER', updateDutyWorker);

    function updateDutyWorker(){
      $log.log("Update the duty worker");
      StaffService
        .dutyWorker()
        .then(function(worker){
          $log.log("Curr duty worker");
          $log.log(worker);
          vm.duty_worker = worker.data[0];
          $log.log(vm.duty_worker);
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
  });

};
