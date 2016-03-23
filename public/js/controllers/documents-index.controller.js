(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('DocumentsIndexController', DocumentsIndexController);

  /*@ngInject*/
  function DocumentsIndexController($scope, $log, $rootScope, moment, documentList, Categories, Topics){
    $log.log($scope);

    var vm = this;
    $log.log(documentList);

    vm.activeTab = 'All documents';
    /*vm.categories = [
      {'label':'All documents', 'value':'', 'active': 'active'},
      {'label':'Finance', 'value':'Finance', 'active':''},
      {'label':'HR', 'value':'HR','active':''},
      {'label':'OH&S', 'value':'OH&S','active':''}
    ];*/

    vm.categories = Categories.data;
    vm.topics = Topics.data;

    /*// move this to a service
    vm.topics = [
      {topic: "Client feedback", category: "HR"},
      {topic: "Leave", category: "HR"},
      {topic: "Workplace functions", category: "HR"},
      {topic: "Aggresive clients", category: "OH&S"},
      {topic: "Chemicals", category: "OH&S"},
      {topic: "Emergencies", category: "OH&S"},
      {topic: "First aid", category: "OH&S"},
      {topic: "Risk assessment", category: "OH&S"},
    ];*/

    function init(){
      $log.log("Loaded the documents index controller");
      $log.log("content");
      $log.log(vm.topics);
      $log.log(vm.categories);

      vm.content = [];
      // group by topic
      var groups = _.groupBy(documentList.data, function(item){
        return item.metadata.topic;
      });

      _.forEach(groups, function(group, key){
        $log.log(group);
        $log.log(key);
        // extract the category
        var c = _.find(vm.topics, {'topic':key});
        $log.log(c);
        vm.content.push({"title": key, "documents": group, "category": c.category});
      });

      $log.log("Cleaned up");
      $log.log(vm.content);
    }

    init();
  }

})();
