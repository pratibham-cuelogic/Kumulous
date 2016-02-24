angular.module('interceptor.service', []).service('interceptorService', ['apiLocalStorageService', interceptorService]);

function interceptorService(apiLocalStorageService){
	var setInject = {
		request: function(config) {
			if(apiLocalStorageService.isSupported()){
				config.headers['authentication'] = apiLocalStorageService.get('tokenId');
			}
			return config;
		}
	};
	return setInject;
}