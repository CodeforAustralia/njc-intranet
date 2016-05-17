module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('NewsEventsCreateController', function($scope, $log){
    $log.log($scope);
    var vm = this;

    function init(){
      $log.log("Loaded the news events create controller");
    }

    vm.model = {};
    vm.fields = [
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'What is this?',
          required: true,
          options: [
            {'value':'news', 'name':'Some News'},
            {'value':'event', 'name':'An Event'}
          ]
        }
      },
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          label: 'Title',
          required: true
        }
      },
      {
        key: 'summary',
        type: 'input',
        templateOptions: {
          label: "Quick summary",
          required: true
        }
      },
      {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: "Full description",
          required: true
        }
      }
    ];

    init();
  });

};
