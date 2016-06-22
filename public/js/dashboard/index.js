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
          SearchData: function($log, SearchService){
            return SearchService.all();
          }
        }
      });
  });
};
