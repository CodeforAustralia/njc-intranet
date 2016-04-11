(function(){
'use strict';

angular.module('njcIntranetApp')
    .factory('AlertService', AlertService);

/*@ngInject*/
function AlertService($rootScope, $log, $alert){
  function showAlert(title, content, type, duration){
    $log.log("Showing the alert");
    var _duration = (typeof duration !== 'undefined') ? duration : 5;
    $alert({container: "#alerts-container", title: title, content: content, placement: 'top', type: type, show: true, duration: _duration});
  }

	return {
    success: function(title, content){
      showAlert(title, content, 'success');
    },
    info: function(title, content){
      showAlert(title, content, 'info');
    },
    error: function(title, content){
      showAlert(title, content, 'danger');
    }
	};
}

})();
