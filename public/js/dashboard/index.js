module.exports = function(app){
  require('./dashboard.controller')(app);
  /*require('./dashboard.controller')(app);
  require('./duty-worker.directive')(app);
  require('./news-updates.directive')(app);
  require('./update-in-out-status.directive')(app);
  require('./weather.directive')(app);
  require('./weather.service')(app);*/

  // state configuration
  /*@ngInject*/
  app.config(function($stateProvider){
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        authenticate : true,
        template: require('./dashboard.html'),
    		controller: 'DashboardController',
        controllerAs: 'vm',
        resolve: {
          Events: function(EventsService){
            return EventsService.all();
          },
          News: function(NewsService){
            return NewsService.all();
          },
          DutyWorker: function(StaffService){
            return StaffService.dutyWorker();
          },
          SearchEvents: function(SearchService){
            return SearchService.events();
          },
          SearchNews: function(SearchService){
            return SearchService.news();
          },
          SearchDocuments: function(SearchService){
            return SearchService.documents();
          },
          SearchStaff: function(SearchService){
            return SearchService.staff();
          },
          SearchData: function($log, SearchDocuments, SearchStaff, SearchEvents, SearchNews){
            // return an array of all the data
            $log.log(_.flatten(SearchDocuments.data));
            // clean up docs
            var docs = [];
            _.each(SearchDocuments.data, function(list){
              return docs.push(list);
            });
            //docs = _.flatten(docs);
            docs =
              _(docs)
              .flatten()
              .map(function(item){
                $log.log(item);
                return {'title': item.title, 'url': "#/documents?q=" + item.title, 'type': 'document'};
              })
              .value();

            // cleanup events
            var events = _.map(SearchEvents.data, function(item){
              return {'title': item.title, 'url': "#/events/" + item.meta.permalink, 'type': 'event'};
            });

            // cleanup news
            var news = _.map(SearchNews.data, function(item){
              return {'title': item.title, 'url': "#/news/" + item.meta.permalink, 'type': 'news'};
            });

            // cleanup events
            var staff = _.map(SearchStaff.data, function(item){
              return {'title': item.name, 'url': "#/staff?q=" + item.name, 'type': 'staff'};
            });

            var clean = _.concat(docs, staff, news, events);

            $log.log("******CLEANED******");
            $log.log(clean);
            return clean;
          }
        }
      });
  });
};
