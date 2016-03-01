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
}]);