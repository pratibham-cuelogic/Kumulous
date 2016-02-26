angular.module('log.controller', ['services']).controller('logCtrl',['$scope', '$rootScope', LogController])

function LogController($scope, $location, $rootScope) {
	var sortKey = 'ID';

	$scope.sortKey = sortKey;
	$scope.pageSizes = [10,20,30,40,50];
	$scope.reverse = false;
	$scope.logs = [];
	$scope.groupedItems = [];
	$scope.employeesPerPage = 10;
	$scope.pagedLogs = [];
	console.log($scope.pagedLogs);

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
		console.log(logs);
		for (var i = 0; i < logs.length; i++) {
			if (i % $scope.logsPerPage === 0) {
				$scope.pagedLogs[Math.floor(i / $scope.logsPerPage)] = [ logs[i] ];
			} else {
				$scope.pagedLogs[Math.floor(i / $scope.logsPerPage)].push(logs[i]);
			}
		}
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedLogs.length - 1) {
			$scope.currentPage++;
		}
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};
}