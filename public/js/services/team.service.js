(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('TeamService', TeamService);

  /*@ngInject*/
  function TeamService($log, $http){
    var teams = [
      {'label':'All staff', 'value':'', 'active': 'active'},
      {'label':'Client services', 'value':'Client services', 'active':''},
      {'label':'Information team', 'value':'Information team', 'active':''},
      {'label':'Project innovation team','value':'Project innovation team','active':''}
    ];

    return {
      all: function(){
        $log.log("Getting all the teams");
        return {
          data: teams
        };
      }
    };
  }

})();