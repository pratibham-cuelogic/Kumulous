'use strict';

angular.module('log.route', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/log', {
		templateUrl : 'log/log.html',
		controller : 'logCtrl'
	});
}]);