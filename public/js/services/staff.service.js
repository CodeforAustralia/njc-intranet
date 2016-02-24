(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('StaffService', StaffService);

  /*@ngInject*/
  function StaffService($log, $http){
    return {
      all: function(){
        $log.log("Getting all the staff");
        return $http.get("/staff");
      },
      create: function(staff){
        return $http.post("/staff", staff);
      }
    };
  }

})();
