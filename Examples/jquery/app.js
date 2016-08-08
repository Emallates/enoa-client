var client = jQuery.enoaclient({appId:"__appId", apiKey:"__apiKey"})

client._sendRequest({url:"http://localhost/logs", method:'post', body:{newObject:123}}, function(err, resp){
	if(err) console.log('got an error', err);
	else console.log(resp);
})