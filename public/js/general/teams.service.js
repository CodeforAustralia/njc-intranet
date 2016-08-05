module.exports = function(app){

  /*@ngInject*/
  app.service('TeamsService', function($log, $http){
    var teams = [
      {'label':'All teams', 'value':'', 'active': 'active', 'shortname': 'All Staff'},
      {'label':'Collingwood Magpies', 'value':'Pies', 'active':'', 'shortname': 'Pies'},
      {'label':'Richmond Tigers', 'value':'Tiges', 'active':'', 'shortname': 'Tiges'},
      {'label':'Geelong Cats','value':'Cats', 'active':'', 'shortname':'Cats'},
      {'label':'Western Bulldogs','value':'Doggies','active':'', 'shortname': 'Doggies'},
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
