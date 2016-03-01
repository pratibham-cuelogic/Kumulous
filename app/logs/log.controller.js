angular.module('log.controller', ['services'])
.controller('logCtrl',['$scope', '$http', '$log', LogController])

function LogController($scope, $http, $log) {
	var sortKey = 'no';

	$scope.sortKey = sortKey;
	$scope.pageSize = 10;
	$scope.reverse = false;
	$scope.logs = [];
	$scope.groupedItems = [];
	$scope.logsPerPage = 10;
	$scope.pagedLogs = [];
	$scope.total = 999;

	if($scope.currentPage == undefined || $scope.currentPage == ''){
		$scope.currentPage = 0;
	}

	$scope.getLogs = function(){
		var logs = null;
		if($scope.pagedLogs == undefined || $scope.pagedLogs ==''){
			$scope.logs = $http.get('data/MOCK_DATA.json').
			success(function(data, status, headers, config){
				$scope.logs = data;
				logs = data;
				groupToPages(logs);
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

	function groupToPages(logs) {
		for (var i = 0; i < logs.length; i++) {
			if (i % $scope.logsPerPage === 0) {
				$scope.pagedLogs[Math.floor(i / $scope.logsPerPage)] = [ logs[i] ];
			} else {
				$scope.pagedLogs[Math.floor(i / $scope.logsPerPage)].push(logs[i]);
			}
		}
	};
}