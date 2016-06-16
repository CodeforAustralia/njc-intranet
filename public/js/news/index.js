module.exports = function(app){
  require('./news-index.controller')(app);
  require('./news-item.controller')(app);
  require('./news-list.directive')(app);
  require('./news.service')(app);

  // state configuration
  /*@ngInject*/
  app.config(function($stateProvider){
    console.log("CONFIG NEWS");
    $stateProvider
      .state('news', {
        abstract: true,
        authenticate : true,
        template: '<ui-view />',
        resolve: {

        }
    	})
      .state('news.index', {
        url: '/news',
        authenticate : true,
        template: require('./news-index.html'),
    		controller: 'NewsIndexController',
        controllerAs: 'vm',
        resolve: {
          NewsList: function(NewsService, $log){
            $log.log("Resolving the newslist");
            return NewsService.all();
          }
        }
      })
      .state('news.create', {
        url: '/news/create',
        authenticate : true,
        template: require('../general/news-events-create.html'),
    		controller: 'NewsEventsCreateController',
        controllerAs: 'vm',
        data: {
          type: 'news'
        },
        resolve: {
        }
      })
      .state('news.item', {
        url: '/news/:permalink',
        authenticate : true,
        template: require('./news-item.html'),
    		controller: 'NewsItemController',
        controllerAs: 'vm',
        resolve: {
          NewsItem: function(NewsService, $log, $stateParams){
            $log.log("Resolving the news item");
            $log.log($stateParams.permalink);
            return NewsService.byPermalink($stateParams.permalink);
          }
        }
      });
  });
};
