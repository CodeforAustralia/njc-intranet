module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('FeedbackCreateController', function($scope, $log, $rootScope, $state, $modal, StaffList, FeedbackService, toastr){
    $log.log("Starting the FeedbackCreateController");
    var vm = this;

    vm.staff_members = _.map(StaffList.data, function(staff_member){
      return {name: staff_member.name, value: staff_member.name};
    });

    vm.types = [{'value':'bug', 'name':'Bug / Somethings broken'}, {'value':'enhancement', 'name':'Enhancement / New idea'}, {'value':'feedback', 'name':'Feedback'}, {'value':'not-sure', 'name':'Not sure, but i want to tell you!'}];

    /*var modal = $modal({
      title: 'Send your feedback',
      contentTemplate: '/js/feedback/feedback.html',
      show: true,
      scope: $scope,
    });

    $log.log(modal);

    $scope.$on('modal.hide',function(){
      $log.log("HIDING");
      $state.go('app.dashboard');
    });*/

    //vm.model = new Entry(); // create a new instance of the entry model
    vm.model = {};
    vm.submitted = false;

    // array of our form fields needed
    vm.fields = [
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type of issue',
          required: true,
          options: vm.types,
        }
      },
      {
        key: 'message',
        type: 'textarea',
        templateOptions: {
          label: 'Message',
          required: true,
        }
      },
      {
        key: 'staff_member',
        type: 'select',
        templateOptions: {
          label: 'Staff member',
          required: false,
          options: vm.staff_members
        }
      }
    ];

    vm.submit = function(){
      $log.log("Submitting the evaluation");
      FeedbackService
        .create(vm.model)
        .then(function(){
          toastr.success("Submitted your evaluation!");
          vm.submitted = true;
        }, function(){
          toastr.error("There was a problem submitting your feedback, please refresh and try again.");
        });
    };

    function init(){
      $log.log("Loaded the evaluation form controller");
    }

    init();
  });

};
