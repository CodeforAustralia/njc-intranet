module.exports = function(app){

  /*@ngInject*/
  app.service('EmailListService', function($log, $http, $q){
    var email_lists = [
      {name: 'All Teams', value: 'all'},
      {name: 'Richmond Tigers', value: 'tiges'},
      {name: 'Geelong Cats', value: 'cats'},
      {name: 'Western Bulldogs', value: 'doggies'},
    ];

    return {
      all: function($q){
        return {
          data: email_lists
        };
      }
    };
  });

};
