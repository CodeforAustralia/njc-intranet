module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('NewsItemController', function($scope, $log, NewsItem){
    $log.log("Loading news index controller");

    var vm = this;
    vm.news = NewsItem.data;

    function init(){
      $log.log("Loaded the news item controller");
    }

    init();
  });

};
