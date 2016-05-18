module.exports = function(app){

  /*@ngInject*/
  app.service('NewsEventsService', function($log, $http, $q){

    return {
      all: function(){
        $log.log("Getting all the news");
        return $http.get('/api/news-events');
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
