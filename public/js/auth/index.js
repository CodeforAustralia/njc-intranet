module.exports = function(app){
  require('./auth.service')(app);
  require('./token.service')(app);
  require('./login.controller')(app);
  require('./logout.controller')(app);

  app.config(function($stateProvider){
    $stateProvider
      .state('auth', {
        abstract: true,
        template: "<ui-view />"
      })
      .state('auth.login', {
        url: '/login',
        template: require('./login.html'),
        controller: 'LoginController',
        controllerAs: 'vm',
        resolve: {

        }
      })
      .state('auth.logout', {
        url: '/login',
        controller: function($scope, AuthService, $state){
          AuthService
            .logout()
            .then(function(){
              $state.go('auth.login');
            });
        },
        controllerAs: 'vm',
        resolve: {

        }
      });
  });
};
