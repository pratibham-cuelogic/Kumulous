'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'employee',
  'log',
  'LocalStorageModule',
  'myApp.version',
  'directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/employees'});
}])

.config(['localStorageServiceProvider', '$httpProvider', function( localStorageServiceProvider, $httpProvider) {
	localStorageServiceProvider
	.setPrefix('authToken')
	.setStorageType('localStorage')
	.setNotify(true, true);
	$httpProvider.interceptors.push('interceptorService');
}]);
