module.exports = function(app){

  /*@ngInject*/
  app.service('NewsService', function($log, $http, $q){

    return {
      all: function(){
        $log.log("Getting all the news");
        return $http.get('/api/news-events?type=news');
      },
      latest: function(){
        $log.log("Getting only the latest news");
        return $http.get('/api/news-events?type=news&limit=3');
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
