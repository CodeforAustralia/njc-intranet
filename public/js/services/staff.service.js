(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('StaffService', StaffService);

  /*@ngInject*/
  function StaffService($log, $http){
    return {
      all: function(){
        $log.log("Getting all the staff");
        return $http.get("api/staff");
      },
      get: function(id){
        return $http.get("api/staff/" + id);
      },
      create: function(staff){
        return $http.post("api/staff", staff);
      },
      update: function(id, staff){
        return $http.put("api/staff/" + id, staff);
      }
    };
  }

})();
