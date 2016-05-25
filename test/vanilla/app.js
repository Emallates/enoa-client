var client = window.enoaclient({appId:"__appId", apiKey:"__apiKey"});

client._sendRequest({url:"http://localhost:3000/logs", method:'post', body:{newObject:123}}, function(err, resp, status){
	if(err) console.log('got an error', err);
	else console.log('Front', typeof resp, resp, status);
})