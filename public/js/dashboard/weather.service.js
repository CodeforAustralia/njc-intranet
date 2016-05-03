module.exports = function(app){

  /*@ngInject*/
  app.service('WeatherService', function($log, $http, $q){
    var weather = {};

    return {
      today: function(){
        $log.log("Getting todays weather");
        return $q.when({
          data: weather
        });
      }
    };
  });

};
