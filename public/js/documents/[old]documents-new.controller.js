module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('DocumentsNewController', function($scope, $log, $rootScope, /*FileLoader*/ moment, toastr){
    $log.log($scope);
    var vm = this;

    /*vm.uploader = new FileUploader({
      url: "/uploads",
      formData: [],
      removeAfterUpload: true
    });

    vm.uploader.onBeforeUploadItem = function(item){
      item.formData.push({
        title: vm.document.title,
        description: vm.document.description,
        topic: vm.document.topics.topic,
        category: vm.document.topics.category,
      });
    };

    vm.uploader.onErrorItem = function(item, response, status){
      console.log('onSuccessItem');
      toastr.error("There was an error uploading your file, try again","Error");
    };

    vm.uploader.onCompleteAll = function(){
      console.log("Uploaded!");
      toastr.success("File uploaded!","Success");
      vm.document = {};
    };*/

    //vm.categories = Categories.data;
    //vm.topics = Topics.data;
    vm.document = { title: "", description: "", topics: "" };

    vm.fields = [
      /*{
        key: 'file',
        type: 'input',
        ngModelAttrs: {
          "nvFileSelect": {
            "attribute": "nv-file-select"
          },
          "fileUploader": {
            "attribute": "uploader"
          }
        },
        templateOptions: {
          type: 'file',
          label: 'File to be added',
          placeholder: 'Select the file to be added',
          required: true,
          "nvFileSelect": "",
          "fileUploader": "uploader"
        }
      },*/

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
          required: true
        }
      },
      {
        key: 'topics',
        type: 'select',
        templateOptions: {
          label: 'Select a topic area',
          placeholder: 'Select a topic area',
          required: true,
          options: vm.topics,
          ngOptions: 'option as option.topic group by option.category for option in to.options'
        }
      }
    ];

    vm.submit = function(){
      // submit the form
      $log.log("Submitting the form");
      $log.log(vm.document);
      vm.uploader.uploadAll();
      $log.log(vm.uploader);
    };

    function init(){
      $log.log("Loaded the documents new controller");
      $log.log(vm.document);
    }

    init();
  });

};
