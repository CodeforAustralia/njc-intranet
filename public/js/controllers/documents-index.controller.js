(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('DocumentsIndexController', DocumentsIndexController);

  /*@ngInject*/
  function DocumentsIndexController($scope, $log, $rootScope, moment, documentList){
    $log.log($scope);

    var vm = this;
    $log.log(documentList);

    vm.categories = [{'title':'All documents', 'active': 'active'}, {'title':'Finance', 'active':''}, {'title':'HR','active':''}, {'title':'OH&S', 'active':''}];

    function init(){
      $log.log("Loaded the documents index controller");
      $log.log("content");
      vm.content = [];
      // group by topic
      var groups = _.groupBy(documentList.data, function(item){
        return item.metadata.topic;
      });

      _.forEach(groups, function(group, key){
        console.log(group);
        console.log(key);
        vm.content.push({"title": key, "documents": group});
      });
      $log.log(vm.content);
    }

    init();
  }

})();
