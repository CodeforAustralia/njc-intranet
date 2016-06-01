module.exports = function(app){

  /*@ngInject*/
  app.service('EmailListService', function($log, $http, $q, DocumentService, StaffService){
    var email_lists = [
      {name: 'All NJC Staff', value: 'all'},
      {name: 'Client Services Team', value: 'client-services'},
      {name: 'Corrections And Legal Service', value: 'corrections'},
      {name: 'Information Team', value: 'information'},
      {name: 'Police Prosecutor', value: 'police-prosecutors'},
      {name: 'Project Innovation Team', value: 'project-innovation'},
      {name: 'Registry', value: 'registry'},
      {name: 'Security Team', value: 'security'},
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
