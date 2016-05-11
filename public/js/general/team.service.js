module.exports = function(app){

  /*@ngInject*/
  app.service('TeamService', function($log, $http){
    var teams = [
      {'label':'All staff', 'value':'', 'active': 'active', 'shortname': 'All Staff'},
      {'label':'Client services', 'value':'Client services', 'active':'', 'shortname': 'Client services'},
      {'label':'Information team', 'value':'Information team', 'active':'', 'shortname': 'Information team'},
      {'label':'Registry','value':'Registry', 'active':'', 'shortname':'Registry'},
      {'label':'Corrections and Legal Service','value':'Corrections and Legal Service','active':'', 'shortname': 'Corrections'},
      {'label':'Police Prosecutor','value':'Police Prosecutor','active':'', 'shortname':'Police prosecutor'},
      {'label':'Project innovation team','value':'Project innovation team','active':'', 'shortname':'Project innovations'},
      {'label':'Security','value':'Security','active':'', 'shortname':'Security'}
    ];

    return {
      all: function(){
        $log.log("Getting all the teams");
        $log.log(teams);
        return {
          data: teams
        };
      }
    };
  });

};
