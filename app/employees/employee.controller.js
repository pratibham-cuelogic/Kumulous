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
		//console.log($scope.employees);
		groupToPages($scope.employees);
		/*
		check pagedEmployees modified record, then compare the main employees json to paged employees or rather copy the pagedEmployee to main employees and then give it a sort, thereafter make it a group.
		*/
		//return false;
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

	/*$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedEmployees.length - 1) {
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
	};*/
}


/*
var generateData = function(){
  var arr = [];
  var letterWords = ["alpha","bravo","charlie","daniel","earl","fish","grace","henry","ian","jack","karen","mike","delta","alex","larry","bob","zelda"]
  for (var i=1;i<60;i++){
	var id = letterWords[Math.floor(Math.random()*letterWords.length)];
	arr.push({"id":id+i,"name":"name "+i,"description":"Description of item #"+i,"field3":id,"field4":"Some stuff about rec: "+i,"field5":"field"+i});
  }
  return arr;
}



function initApp($scope, $filter) {
 
  // init
  $scope.sortingOrder = sortingOrder;
  $scope.pageSizes = [10,20,30,40,50];
  $scope.reverse = false;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.itemsPerPage = 10;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.items = generateData();

  var searchMatch = function (haystack, needle) {
	if (!needle) {
	  return true;
	}
	return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };
  
  // init the filtered items
  $scope.search = function () {
	$scope.filteredItems = $filter('filter')($scope.items, function (item) {
	  for(var attr in item) {
		if (searchMatch(item[attr], $scope.query))
		  return true;
	  }
	  return false;
	});
	// take care of the sorting order
	if ($scope.sortingOrder !== '') {
	  $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
	}
	$scope.currentPage = 0;
	// now group by pages
	$scope.groupToPages();
  };
  
  // show items per page
  $scope.perPage = function () {
	$scope.groupToPages();
  };
  
  // calculate page in place
  $scope.groupToPages = function () {
	$scope.pagedItems = [];
	
	for (var i = 0; i < $scope.filteredItems.length; i++) {
	  if (i % $scope.itemsPerPage === 0) {
		$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
	  } else {
		$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
	  }
	}
  };
  
   $scope.deleteItem = function (idx) {
		var itemToDelete = $scope.pagedItems[$scope.currentPage][idx];
		var idxInItems = $scope.items.indexOf(itemToDelete);
		$scope.items.splice(idxInItems,1);
		$scope.search();
		
		return false;
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
  
  $scope.prevPage = function () {
	if ($scope.currentPage > 0) {
	  $scope.currentPage--;
	}
  };
  
  $scope.nextPage = function () {
	if ($scope.currentPage < $scope.pagedItems.length - 1) {
	  $scope.currentPage++;
	}
  };
  
  $scope.setPage = function () {
	$scope.currentPage = this.n;
  };
  
  // functions have been describe process the data for display
  $scope.search();
 
  
  // change sorting order
  $scope.sort_by = function(newSortingOrder) {
	if ($scope.sortingOrder == newSortingOrder)
	  $scope.reverse = !$scope.reverse;
	
	$scope.sortingOrder = newSortingOrder;
  };

};

initApp.$inject = ['$scope', '$filter'];

//$(document).ready(function() {});*/