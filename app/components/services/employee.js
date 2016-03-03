angular.module('employee.service', [])
.service('employeeService', ['$http', employeeService]);

function employeeService($http){
	var service = {};
	var employees = {};
	var errorMessage = "";

	function getData(){
		$http.get('data/employeeData.json').
			success(function(data, status, headers, config){
				employees = data.Employees;
			}).
			error(function(data, status, headers, config){
				errorMessage = "Issue with json upload";
			});
		return employees;
	}

	service.getData = getData();
	return service;
}