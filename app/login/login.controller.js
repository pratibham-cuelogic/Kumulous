angular.module('login.controller', ['services']).controller('loginCtrl',['$scope', '$location', 'loginService', '$rootScope', 'apiLocalStorageService', LoginController])

function LoginController($scope, $location, loginService, $rootScope, apiLocalStorageService) {
	//$scope.home = loginService.getHome();
	$scope.error = "";

	$scope.login = function(){
		if(loginService.login( $scope.username, $scope.password)){
			if(apiLocalStorageService.isSupported()){
				apiLocalStorageService.set('tokenId', $scope.username);
				$location.path('/home/'+$scope.username);
				$rootScope.username = $scope.username;
			} else {
				$scope.error="Kindly update browser version";
			}			
		} else {
			$scope.error="Username or password incorrect";
		}
	};

	$scope.authenticate = function(){
		if(loginService.authenticate()){
			if(apiLocalStorageService.isSupported()){
				apiLocalStorageService.set('tokenId', $scope.username);
				$location.path('/home'+$scope.username);
				$rootScope.username = $scope.username;
			} else {
				$scope.error="Kindly update browser version";
			}
		} else {
			$scope.login();
		}
	};
}