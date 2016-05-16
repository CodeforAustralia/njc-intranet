module.exports = function(app){

  /*@ngInject*/
  app.service('StaffService', function($log, $http){
    return {
      all: function(){
        $log.log("Getting all the staff");
        return $http.get("/api/staff");
      },
      get: function(id){
        return $http.get("/api/staff/" + id);
      },
      create: function(staff){
        return $http.post("/api/staff", staff);
      },
      update: function(id, staff){
        $log.log(id);
        $log.log(staff);
        return $http.put("/api/staff/" + id, staff);
      },
      dutyWorker: function(){
        return $http.get("/api/staff?duty_worker=true");
      }
    };
  });

};
