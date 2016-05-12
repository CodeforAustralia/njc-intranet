module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsIndexController', function($scope, $log, $rootScope, moment, documentList, Categories, Types){
    $log.log($scope);

    var vm = this;
    $log.log(documentList);

    vm.query = ""; // used for the search filter
    vm.activeTab = 'All documents';
    vm.categories = Categories.data;
    vm.types = Types.data;

    function init(){
      $log.log("Loaded the documents index controller");
      $log.log("content");
      $log.log(vm.types);
      $log.log(vm.categories);

      _.each(vm.categories, function(category){
        category.value = category.category;
        category.active = "";
      });

      vm.categories.unshift({'category':'All documents', 'value': "", 'active':'active'});

      vm.content = [];
      // Getting rid of groupings for now figure that out later
      $log.log(documentList);
      vm.content = documentList.data;
      $log.log(vm.content);
      /*// group by topic
      var groups = _.groupBy(documentList.data, function(item){
        $log.log(item);
        return item.metadata.type;
      });

      $log.log("Groups");
      $log.log(groups);

      _.forEach(groups, function(group, key){
        $log.log("foreach category");
        $log.log(group);
        $log.log(key);
        // extract the category
        var c = _.find(vm.category, {'category':key});
        $log.log(c);
        vm.content.push({"title": key, "documents": group, "category": c.category});
      });

      $log.log("Cleaned up");
      $log.log(vm.content);*/
    }

    init();
  });

};
