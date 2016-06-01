module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsIndexController', function($scope, $log, $rootScope, moment, documentList, Categories, Types){
    $log.log($scope);

    var vm = null;
    vm = this;
    $log.log(documentList);

    vm.query = ""; // used for the search filter
    vm.activeTab = 'All documents';
    vm.categories = [];
    vm.categories = angular.copy(Categories.data);
    vm.types = Types.data;

    function init(){
      $log.log("Loaded the documents index controller");
      $log.log("content");
      $log.log(Categories.data);
      $log.log(vm.types);
      $log.log(vm.categories);

      vm.categories.unshift({category: 'All documents', active: 'active'});
      _.each(vm.categories, function(category){
        category.value = category.category;
        category.active = category.active || "";
      });

      //vm.categories.unshift({'category':'All documents', 'value': "", 'active':'active'});

      vm.content = [];
      // Getting rid of groupings for now figure that out later
      $log.log("DOC LIST");
      $log.log(documentList);

      var docs = [];
      _.each(documentList.data, function(list){
        return docs.push(list);
      });

      docs = _.flatten(docs);
      $log.log(docs);

      vm.content = _.groupBy(docs, function(doc){
        return doc.metadata.category;
      });
      $log.log(vm.content);

      /*vm.content = {'sorted': {}, 'unsorted': []};
      $log.log(vm.content);

      // set up the sorted and unsorted lists
      _.map(documentList.data, function(list, key){
        if (key.length > 0){
          vm.content.sorted[key] = _.sortBy(list, ['title']);
        }
        else {
          vm.content.unsorted = _.sortBy(list, ['title']);
        }
      });*/

      $log.log(vm.content);
    }

    init();
  });

};
