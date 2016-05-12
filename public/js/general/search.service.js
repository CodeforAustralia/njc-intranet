module.exports = function(app){

  /*@ngInject*/
  app.service('SearchService', function($log, $http, DocumentService, StaffService){
    return {
      documents: function(){
        return DocumentService.all();
      },
      staff: function(){
        return StaffService.all();
      }
    };
  });

};
