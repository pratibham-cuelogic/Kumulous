'use strict';

angular.module('log.route', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/log', {
		templateUrl : 'logs/log.html',
		controller : 'logCtrl'
	});
}]);