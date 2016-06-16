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
      updateStatus: function(status){
        $log.log(status);
        return $http.put("/api/staff/" + status.staff_member, _.omit(status, 'staff_member'));
      },
      dutyWorker: function(){
        return $http.get("/api/staff?duty_worker=true");
      }
    };
  });

};
