(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .controller('DocumentsNewController', DocumentsNewController);

  /*@ngInject*/
  function DocumentsNewController($scope, $log, $rootScope, moment){
    $log.log($scope);

    let vm = this;

    vm.categories = [{'title':'All documents', 'active': 'active'}, {'title':'Finance', 'active':''}, {'title':'HR','active':''}, {'title':'OH&S', 'active':''}];
    vm.document = {

    };

    vm.fields = [
      {
        key: 'file',
        type: 'input',
        templateOptions: {
          type: 'file',
          label: 'File to be added',
          placeholder: 'Select the file to be added',
          required: true
        }
      },
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
        key: 'Topics',
        type: 'select',
        templateOptions: {
          label: 'Select a topic area',
          placeholder: 'Select a topic area',
          required: true,
          options: [
            {topic: "Client feedback", category: "HR"},
            {topic: "Leave", category: "HR"},
            {topic: "Workplace functions", category: "HR"},
            {topic: "Aggresive clients", category: "OH&S"},
            {topic: "Chemicals", category: "OH&S"},
            {topic: "Emergencies", category: "OH&S"},
            {topic: "First aid", category: "OH&S"},
            {topic: "Risk assessment", category: "OH&S"},
          ],
          ngOptions: 'option as option.topic group by option.category for option in to.options'
        }
      }
    ];

    vm.submit = function(){
      // submit the form
    };

    function init(){
      $log.log("Loaded the documents new controller");
    }

    init();
  }

})();
