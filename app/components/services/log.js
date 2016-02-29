angular.module('log.service', [])
.service('logService', ['$http', logService]);

function logService($http){
	var service = {};
	var logs = {};
	var errorMessage = "";

	function getLogs(){
		$http.get('data/MOCK_DATA.json').
			success(function(data, status, headers, config){
				logs = data;
			}).
			error(function(data, status, headers, config){
				errorMessage = "Issue with json upload";
			});
		return logs;
	}

	service.getLogs = getLogs();
	return service;
}