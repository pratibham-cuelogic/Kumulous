angular.module('employee.controller', ['services'])
.controller('empCtrl', ['$scope', '$location', '$routeParams', '$rootScope', '$http', EmployeeController])

function EmployeeController($scope, $location, $routeParams, $rootScope, $http){
	$scope.getEmployees = function(){
		$http.get('data/employeeData.json').
			success(function(data, status, headers, config){
				$scope.employees = data;
			}).
			error(function(data, status, headers, config){
				$scope.errorMessage = "Issue with json upload";
			});
	}
}