module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsCreateController', function($scope, $log, $rootScope, DocumentsService, moment, toastr, Categories, Types){
    $log.log($scope);
    var vm = this;

    vm.types = _.map(Types.data, function(type){
      return {name: type.type, value: type.type};
    });

    $log.log(Categories.data);

    vm.categories = _.map(Categories.data, function(category){
      return {name: category.category, value: category.category};
    });

    $log.log(vm);

    vm.document = {};

    vm.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          label: 'Title of document',
          placeholder: 'Enter a title for the document',
          required: true
        }
      },
      {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Short description of the document',
          placeholder: 'Enter a short description of the document',
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'What type of document is this?',
          placeholder: 'Select a document type',
          required: true,
          options: vm.types,

        }
      },
      {
        key: 'category',
        type: 'select',
        templateOptions: {
          label: 'Select a document category',
          placeholder: 'Select a document category',
          required: true,
          options: vm.categories,
        }
      },
      /*{
        key: 'local_file',
        type: 'checkbox',
        templateOptions: {
          label: 'Is this file on the G drive?',
          required: false,
        }
      },*/
      {
        key: 'location',
        type: 'input',
        templateOptions: {
          label: 'Url',
          placeholder: 'Add the url of the file'
        }
      },
      {
        key: 'show_online',
        type: 'checkbox',
        templateOptions: {
          label: 'Should this document be visible online?',
          required: false,
        }
      },
    ];

    vm.submit = function(){
      $log.log("Creating the document");
      $log.log(vm.document);
      vm.document.show_online = vm.document.show_online || false;
      DocumentsService
        .create(vm.document)
        .then(function(){
          toastr.success("Created the new document");
        }, function(){
          toastr.error("There was a problem, please refresh and try again");
        });
    };

    function init(){
      $log.log("Loaded the documents new controller");
    }

    init();
  });

};
