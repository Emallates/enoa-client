module.exports = sendRequest;

function sendRequest(opts, callback){
	var adapter = this;
	function doRequest(requester, reqOpts){
		requester.call(adapter, reqOpts, function(err, resp){ if(err) fallBack(err); else success(resp); });
	}

	function success(httpResponse){
		var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status
      || httpResponse.statusCode
      || httpResponse && httpResponse.body && 200;
    // if(status) callback(null, httpResponse);

    var ok = status === 200 || status === 201;
    var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

    callback(null, httpResponse);
	}
	function fallBack(err){
		// if(err === notRequestAble)
		return (adapter.fallBack) ? adapter.fallBack(opts, callback) : callback(err);
	}
	doRequest(adapter._request, opts);
}