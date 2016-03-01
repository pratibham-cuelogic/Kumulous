angular.module('employee.controller', ['services'])
.controller('empCtrl', ['$scope', '$http', EmployeeController])

function EmployeeController($scope, $http){
	var sortKey = 'ID';

	$scope.sortKey = sortKey;
	$scope.pageSize = [10,20,30,40,50];
	$scope.reverse = false;
	$scope.employees = [];
	$scope.groupedItems = [];
	$scope.employeesPerPage = 10;
	$scope.pagedEmployees = [];
	$scope.total = 5;

	if($scope.currentPage == undefined || $scope.currentPage == ''){
		$scope.currentPage = 0;
	}

	$scope.getEmployees = function(){
		var employees = null;
		if($scope.pagedEmployees == undefined || $scope.pagedEmployees ==''){
			$scope.employees = $http.get('data/employeeData.json').
			success(function(data, status, headers, config){
				$scope.employees = data.Employees;
				employees = data.Employees;
				groupToPages(employees);
			}).
			error(function(data, status, headers, config){
				$scope.errorMessage = "Issue with json upload";
			});
		}
	}

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}

	$scope.deleteEmployee = function(index){
		var employeeToDelete = $scope.pagedEmployees[$scope.currentPage][index];
		var indexedEmployee = $scope.employees.indexOf(employeeToDelete);
		$scope.employees.splice(indexedEmployee,1);
		groupToPages($scope.employees);
	}

	function groupToPages(employees) {
		for (var i = 0; i < employees.length; i++) {
			if (i % $scope.employeesPerPage === 0) {
				$scope.pagedEmployees[Math.floor(i / $scope.employeesPerPage)] = [ employees[i] ];
			} else {
				$scope.pagedEmployees[Math.floor(i / $scope.employeesPerPage)].push(employees[i]);
			}
		}
	};
}