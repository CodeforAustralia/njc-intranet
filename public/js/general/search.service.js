module.exports = function(app){

  /*@ngInject*/
  app.service('SearchService', function($log, $http, DocumentsService, StaffService, NewsService, EventsService){
    return {
      documents: function(){
        return DocumentsService.all();
      },
      staff: function(){
        return StaffService.all();
      },
      news: function(){
        return NewsService.all();
      },
      events: function(){
        return EventsService.all();
      }
    };
  });

};
