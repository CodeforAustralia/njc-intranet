module.exports = function(app){
  require('./events-index.controller')(app);
  require('./events-item.controller')(app);
  require('./events-cards.directive')(app);
  require('./events-list.directive')(app);
  require('./events-calendar.directive')(app);
  require('./events.service')(app);

  // state configuration
  /*@ngInject*/
  app.config(function($stateProvider){
    $stateProvider
      .state('events', {
        abstract: true,
        authenticate : true,
        template: '<ui-view />',
        resolve: {

        }
      })
      .state('events.index', {
        url: '/events',
        authenticate : true,
        template: require('./events-index.html'),
    		controller: 'EventsIndexController',
        controllerAs: 'vm',
        resolve: {
          EventsList: function($stateParams, EventsService){
            return EventsService.all();
          }
        }
      })
      .state('events.create', {
        url: '/events/create',
        authenticate : true,
        admin: true,        
        template: require('../general/news-events-create.html'),
    		controller: 'NewsEventsCreateController',
        controllerAs: 'vm',
        data: {
          type: 'event'
        },
        resolve: {
        }
      })
      .state('events.item', {
        url: '/events/:permalink',
        authenticate : true,
        template: require('./events-item.html'),
    		controller: 'EventsItemController',
        controllerAs: 'vm',
        resolve: {
          EventItem: function($stateParams, EventsService){
            return EventsService.byPermalink($stateParams.permalink);
          }
        }
      });
  });
};
