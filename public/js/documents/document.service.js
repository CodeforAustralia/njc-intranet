module.exports = function(app){

  /*@ngInject*/
  app.service('DocumentService', DocumentService);

  /*@ngInject*/
  function DocumentService($log, $http, Constants){

    var document_types = [{'type':'Policies'},{'type':'Procedures'},{'type':'Forms'},{'type':'Supporting documents'}];
    var document_categories = [{'category':'HR'}, {'category':'NJC Policies'}, {'category':'OHS'}, {'category':'Finance'}, {'category':'Administration'}];

    return {
      all: function(){
        $log.log("Getting all the documents");
        return $http.get(Constants.urls.api+"/documents");
      },
      types: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: document_types});
        });
      },
      categories: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: document_categories});
        });
      },
      get: function(id){
        // by default just return the latest version of a document
        return $http.get(Constants.urls.api+"/documents");
      }
    };
  }

};
