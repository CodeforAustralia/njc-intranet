module.exports = function(app){
  require('./staff-index.controller')(app);
  require('./staff-create.controller')(app);
  //require('./staff-edit-status.controller')(app);
  //require('./staff-edit-modal.controller')(app);
  require('./staff-edit.controller')(app);
  require('./staff-edit-status.controller')(app);
  require('./staff-list.directive')(app);
  require('./staff.service')(app);

  /*@ngInject*/
  app.config(function($stateProvider){
    $stateProvider
      .state('staff', {
        abstract: true,
        authenticate : true,
        template: '<ui-view />',
        resolve: {
          Teams: function(TeamsService){
            return TeamsService.all();
          }
        }
    	})
      .state('staff.index', {
        url: '/staff',
        authenticate : true,
        template: require('./staff-index.html'),
    		controller: 'StaffIndexController',
        controllerAs: 'vm',
        resolve: {
          StaffList: function(StaffService, $log){
            $log.log("Resolving the staff list");
            return StaffService.all();
          },
          DutyWorker: function(StaffService){
            return StaffService.dutyWorker();
          }
        }
      })
      .state('staff.create', {
        url: '/staff/create',
        authenticate : true,
        admin: true,
        template: require('./staff-create.html'),
    		controller: 'StaffCreateController',
        controllerAs: 'vm',
        resolve: {
        }
      })
      .state('staff.edit-status', {
        url: '/staff/edit-status',
        authenticate : true,
        template: require('./staff-edit-status.html'),
    		controller: 'StaffEditStatusController',
        controllerAs: 'vm',
        resolve: {
          StaffList: function(StaffService, $log){
            $log.log("Resolving the staff list");
            return StaffService.all();
          }
        }
      })
      .state('staff.edit', {
        url: '/staff/:id/edit',
        authenticate : true,
        admin: true,        
        template: require('./staff-edit.html'),
    		controller: 'StaffEditController',
        controllerAs: 'vm',
        resolve: {
          StaffMember: function($stateParams,StaffService){
            return StaffService.get($stateParams.id);
          }
        }
      });
  });
};
