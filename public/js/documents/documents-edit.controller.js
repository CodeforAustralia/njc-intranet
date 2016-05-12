module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsEditController', function($scope, $log, $rootScope, DocumentService, Document, moment, toastr, Categories, Types){
    $log.log($scope);
    var vm = this;

    vm.types = _.map(Types.data, function(type){
      return {name: type.type, value: type.type};
    });

    $log.log(Categories.data);

    vm.categories = _.map(Categories.data, function(category){
      return {name: category.category, value: category.category};
    });

    vm.document = Document.data;

    $log.log(vm);

    vm.model = {
      title: vm.document.title,
      description: vm.document.description,
      type: vm.document.metadata.type,
      category: vm.document.metadata.category,
      local_file: vm.document.local_file,
      url: vm.document.location.url,
      local_path: vm.document.location.local_path,
    };

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
          label: 'Select a document type',
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
      {
        key: 'local_file',
        type: 'checkbox',
        templateOptions: {
          label: 'Is this file on the G drive?',
          required: true,
        }
      },
      {
        key: 'location',
        type: 'input',
        templateOptions: {
          label: 'Url',
          placeholder: 'Add the url of the file'
        }
      }
    ];

    vm.update = function(){
      $log.log("updating the document");
      DocumentService
        .update(vm.document._id, vm.model)
        .then(function(){
          toastr.success("Updated the document details");
        }, function(){
          toastr.error("There was a problem, please refresh and try again");
        });
    };

    function init(){
      $log.log("Loaded the documents edit controller");
      $log.log(vm.document);
    }

    init();
  });

};
