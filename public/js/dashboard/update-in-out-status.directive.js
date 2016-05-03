module.exports = function(app) {
    'use strict';
    // App bootstrapping + DI
    /*@ngInject*/
    app.directive('njcUpdateInOutStatus', function($log, Constants) {
        return {
            restrict: "EA", // element or attribute only
            replace: true, // replace the element
            template: require('./update-in-out-status.directive.html'),
            scope: {

            },
            link: function(scope, elem, attrs) {
                $log.log("Update in out status directive");

            }
        };
    });

};
