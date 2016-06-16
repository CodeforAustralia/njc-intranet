module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DashboardController', function($scope, $log, Events, News, DutyWorker, SearchData){
    $log.log("Loading dashboard controller");

    var vm = this;

    vm.selectedDay = "";
    vm.news = News.data;
    vm.filteredEvents = Events.data;
    vm.dutyWorker = DutyWorker.data;

    vm.searchQuery = "";
    vm.searchData = SearchData;
    $log.log(vm);

    vm.filterEventsList = function(e){
      $log.log(e);

      if (e.year && e.month){
        $log.log("Filtering by the current month");
        vm.filteredEvents = _.filter(Events.data, function(o){
          return inMonth(e, o.date);
        });
      }
      else {
        $log.log("Filtering by the current day");
        vm.filteredEvents = _.filter(Events.data, function(o){
          return onDay(e, o.date);
        });
      }
    };

    function onDay(target, date){
      // check if date is in the target month
      var d = new Date(date);
      var td = new Date(target);
      if (
        d.getFullYear() === td.getFullYear() &&
        d.getMonth() === td.getMonth() &&
        d.getDate() === td.getDate()
      )
        return true;
      return false;
    }

    function inMonth(target, date){
      // check if date is in the target month
      var d = new Date(date);
      $log.log(target);
      $log.log(d);
      if ((d.getMonth() + 1) === target.month && (d.getFullYear()) === target.year)
        return true;
      return false;
    }

    function init(){
      $log.log("Loaded the dashboard controller");
    }

    init();
  });

};
