'use strict';

angular.module('employee.route',['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/employees', {
		templateUrl: 'employees/employees.html',
		controller: 'empCtrl'
	});
}])