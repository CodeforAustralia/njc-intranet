// load all the files that are in this dir
module.exports = function(app){
  require('./documents.service')(app);
  require('./documents-index.controller')(app);
  require('./documents-create.controller')(app);
  require('./documents-edit.controller')(app);
  //require('./documents-edit.controller')(app);
  //require('./documents-view.controller')(app);
  require('./documents-list.directive')(app);

  /*@ngInject*/
  app.config(function($stateProvider){
    console.log("CONFIG NEWS");
    $stateProvider
      .state('documents', {
        abstract: true,
        authenticate : true,
        template: '<ui-view />',
        resolve: {
          Categories: function(DocumentsService){
            return DocumentsService.categories();
          },
          Types: function(DocumentsService){
            return DocumentsService.types();
          },
          Groups: function($log, DocumentsService){
            $log.log("Document groups");
            $log.log(DocumentsService.groups());
            return DocumentsService.groups();
          }
        }
    	})
      .state('documents.index', {
        url: '/documents',
        authenticate : true,
        template: require('./documents-index.html'),
    		controller: 'DocumentsIndexController',
        controllerAs: 'vm',
        resolve: {
          DocumentsList: function(DocumentsService, $log){
            $log.log("Resolving the documents list");
            return DocumentsService.all();
          }
        }
      })
      .state('documents.create', {
        url: '/documents/create',
        authenticate : true,
        admin: true,
        template: require('./documents-create.html'),
    		controller: 'DocumentsCreateController',
        controllerAs: 'vm',
        resolve: {
        }
      })
      .state('documents.edit', {
        url: '/documents/:id/edit',
        authenticate : true,
        admin: true,        
        template: require('./documents-edit.html'),
    		controller: 'DocumentsEditController',
        controllerAs: 'vm',
        resolve: {
          Document: function($stateParams, DocumentsService){
            return DocumentsService.get($stateParams.id);
          }
        }
      });
  });
};
