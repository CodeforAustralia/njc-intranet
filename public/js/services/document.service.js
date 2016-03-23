(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('DocumentService', DocumentService);

  /*@ngInject*/
  function DocumentService($log, $http){
    return {
      all: function(){
        $log.log("Getting all the documents");
        return $http.get("api/documents");
      },
      get: function(id){
        // by default just return the latest version of a document
        return $http.get("api/documents");
      }
    };
  }

})();
