module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsIndexController', function($scope, $log, moment, DocumentsList, Categories, $location, ClientService){
    $log.log($scope);

    var vm = null;
    vm = this;
    $log.log(DocumentsList);
    $log.log("is admin?");
    vm.is_admin = ClientService.isAdmin();
    $log.log(vm);

    var params = $location.search();
    vm.query = params.q || "";
    vm.activeTab = 'All documents';
    vm.categories = [];
    vm.categories = angular.copy(Categories.data);

    function init(){
      $log.log("Loaded the documents index controller");
      $log.log("content");
      $log.log(Categories.data);
      $log.log(vm.categories);

      vm.categories.unshift({category: 'All documents', active: 'active'});
      _.each(vm.categories, function(category){
        category.value = category.category;
        category.active = category.active || "";
      });

      //vm.categories.unshift({'category':'All documents', 'value': "", 'active':'active'});

      // TODO: Refactor this mess
      vm.content = [];
      // Getting rid of groupings for now figure that out later
      $log.log("DOC LIST");
      $log.log(DocumentsList);

      var docs = DocumentsList.data;
      $log.log(docs);
      
      var grouped = _.groupBy(docs, function(doc){
        return doc.metadata.category;
      });
      $log.log(vm.content);

      $log.log("SORTING");
      _.each(grouped, function(arr, key){
        $log.log(arr);
        $log.log(key);
        //return key;
        return vm.content.push({category: key, documents: _.sortBy(arr, ['title'])});
      });
      $log.log(vm.content);

      vm.content = _.sortBy(vm.content, ['category']);
      $log.log(vm.content);

    }

    init();
  });

};
