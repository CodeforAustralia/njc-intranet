module.exports = function(app){

  /*@ngInject*/
  app.service('DocumentsService', function($log, $http){

    var document_types = [{'type':'Policies'},{'type':'Procedures'},{'type':'Forms'},{'type':'Supporting documents'}];
    var document_categories = [{'category':'HR'}, {'category':'NJC Policies'}, {'category':'OHS'}, {'category':'Finance'}, {'category':'Administration'}];

    return {
      all: function(){
        $log.log("Getting all the documents");
        return $http.get("/api/documents");
      },
      types: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: document_types});
        });
      },
      categories: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: _.sortBy(document_categories, ['category'])});
        });
      },
      groups: function(){
        return $http.get('/api/document-groups');
      },
      get: function(id){
        // by default just return the latest version of a document
        return $http.get("/api/documents/" + id);
      },
      update: function(id, model){
        return $http.put("/api/documents/" + id, model);
      }
    };
  });

};
