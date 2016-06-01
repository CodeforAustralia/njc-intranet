module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('NewsEventsIndexController', function($scope, $log, newsEventsList){
    $log.log($scope);
    var vm = this;
    vm.list = [];

    //$log.log(newsEventsList.data.length);

    if (newsEventsList.data.length > 0){
      vm.list = _.groupBy(newsEventsList.data, function(item){
        // group by the ymd portion of the posted date
        var d = new Date(item.meta.posted_at);
        return d.getFullYear() + "-" + zero_pad(d.getMonth()+1) + "-" + zero_pad(d.getDate());
      });
    }

    function zero_pad(str, min){
      var minlength = (typeof min !== 'undefined') ? min : 2;
      var strlen = String(str).length;
      if (strlen < minlength){
        for (var i=0;i<(minlength-strlen);i++)
          str = String("0" + str);
      }
      return String(str);
    }

    function init(){
      $log.log("Loaded the news events index controller");
    }

    init();
  });

};
