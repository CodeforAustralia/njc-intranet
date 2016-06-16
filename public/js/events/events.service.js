module.exports = function(app){

  /*@ngInject*/
  app.service('EventsService', function($log, $http, $q){

    return {
      all: function(){
        $log.log("Getting all the events");
        return $http.get('/api/news-events?type=events');
      },
      latest: function(){
        $log.log("Getting only the latest events");
        return $http.get('/api/news-events?type=events&limit=3');
      },
      create: function(model){
        return $http.post('/api/news-events', model);
      },
      byPermalink: function(permalink){
        return $http.get('/api/news-events/' + permalink);
      }
    };
  });

};
