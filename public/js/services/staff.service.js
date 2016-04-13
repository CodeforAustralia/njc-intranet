(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('StaffService', StaffService);

  /*@ngInject*/
  function StaffService($log, $http, Constants){
    return {
      all: function(){
        $log.log("Getting all the staff");
        return $http.get(Constants.urls.api+"/staff");
      },
      get: function(id){
        return $http.get(Constants.urls.api+"/staff/" + id);
      },
      create: function(staff){
        return $http.post(Constants.urls.api+"/staff", staff);
      },
      update: function(id, staff){
        $log.log(id);
        $log.log(staff);
        return $http.put(Constants.urls.api+"/staff/" + id, staff);
      },
      dutyWorker: function(){
        return $http
                .get(Constants.urls.api+"/staff?duty_worker=true")
                .then(function(data){
                  $log.log("Duty worker result: ");
                  $log.log(data);
                }, function(err){
                  $log.log("Duty worker err: ");
                  $log.log(err);
                });
      }
    };
  }

})();
