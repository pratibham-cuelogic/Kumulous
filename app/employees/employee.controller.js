angular.module('employee.controller', ['services'])
.controller('empCtrl', ['$scope', '$http', EmployeeController])

function EmployeeController($scope, $http){
	var sortKey = 'ID';

	$scope.sortKey = sortKey;
	$scope.pageSize = [10,20,30,40,50];
	$scope.reverse = false;
	$scope.employees = [];
	$scope.employeesPerPage = 10;
	$scope.pagedEmployees = [];
	$scope.total = 5;

	if($scope.currentPage == undefined || $scope.currentPage == ''){
		$scope.currentPage = 0;
	}
	if($scope.boolDel == undefined || $scope.boolDel == ''){
		$scope.boolDel = false;
	}

	$scope.getEmployees = function(){
		if(false == $scope.boolDel){
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
	}

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}

	$scope.deleteEmployee = function(index){
		$scope.boolDel = true;
		var employeeToDelete = $scope.pagedEmployees[$scope.currentPage][index];
		var indexedEmployee = $scope.employees.indexOf(employeeToDelete);
		$scope.employees.splice(indexedEmployee,1);
		//console.log($scope.employees);
		groupToPages($scope.employees);
		/*
		check pagedEmployees modified record, then compare the main employees json to paged employees or rather copy the pagedEmployee to main employees and then give it a sort, thereafter make it a group.
		*/
		return false;
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