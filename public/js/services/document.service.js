(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('DocumentService', DocumentService);

  /*@ngInject*/
  function DocumentService($log, $http){
    return {
      all: function(){
        $log.log("Getting all the documents");
        return $http.get("/documents");
      }
    };
  }

})();
