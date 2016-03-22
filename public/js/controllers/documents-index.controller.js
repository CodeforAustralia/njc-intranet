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
    vm.categories = Categories.data;
    vm.topics = Topics.data;

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
