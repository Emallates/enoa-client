var client = window.enoaclient({
	appId:"__appId", apiKey:"__apiKey",
	collections:{
		adop:{adapter:function(){}}
	}
});

// console.log('', client.adop);

var v = client.adop._sendRequest({
	method:'get',
	url:'http://192.168.0.4:4000/get/500'
	, callback:function (err, rslt) { if(err) console.log('Got an error', err); else console.log('Got success', rslt); }
})



// client._sendRequest({url:"http://localhost/logs", method:'get', body:{newObject:123}}, function(err, resp, status){
// 	if(err) console.log('got an error', err);
// 	else console.log('Front', typeof resp, resp, status);
// })