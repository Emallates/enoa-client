var app = angular.module('app', ['enoa'])
.controller('ctrl', ['client', '$scope', '$http', function(client, $scope, $http){
	client._sendRequest({url:"http://localhost:3000/logs", method:'post', body:{"title":"iPhone", "price":"1122"}}, function(err, resp){
		if(err) console.log('got an error', err);
		else console.log(resp);
	});
}])

.service('client', ['enoaclient', function(enoaclient){
	return enoaclient({appId:"_appId", apiKey:"_apiKey"})
}])