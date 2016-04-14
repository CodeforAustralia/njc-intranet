(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('WeatherService', WeatherService);

  /*@ngInject*/
  function WeatherService($log, $http, $q){
    var weather = {};

    return {
      today: function(){
        $log.log("Getting todays weather");
        return $q.when({
          data: weather
        });
      }
    };
  }

})();
