module.exports = function(app){

  /*@ngInject*/
  app.service('CategoryService', function($log, $http){
    var categories = [
      {'label':'All documents', 'value':'', 'active': 'active'},
      {'label':'Finance', 'value':'Finance', 'active':''},
      {'label':'HR', 'value':'HR','active':''},
      {'label':'OH&S', 'value':'OH&S','active':''}
    ];

    return {
      all: function(){
        $log.log("Getting all the categories");
        return {
          data: categories
        };
      }
    };
  });

};
