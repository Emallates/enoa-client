var handles = {
  http: require('http'),
  https: require('https')
};
var qs = require('querystring');
var zlib = require('zlib');


function HttpConnector(configs){
	this.hand = handles[configs.protocol || 'http'];
}




HttpConnector.prototype.getRequestFun = function (params, cb) {
  var incoming;
  var timeoutId;
  var request;
  var status = 0;
  var headers = {};
  var response;

  var reqParams = this.makeReqParams(params);

  console.log(reqParams);

  // request = this.hand.request(reqParams, function (_incoming) {});

  return function () { request.abort(); };
};



HttpConnector.prototype.makeReqParams = function (params) {
  params = params || {};
  // var host = this.host;

  var reqParams = {
    method: params.method || 'GET',
    protocol: params.protocol + ':',
    hostname: params.host,
    port: params.port,
    path: params.url,
    // path: (host.path || '') + (params.path || ''),
    headers: params.headers
    // ,agent: this.agent
  };

  if (!reqParams.path) {
    reqParams.path = '/';
  }

  // var query = host.getQuery(params.query);
  // if (query) {
  //   reqParams.path = reqParams.path + '?' + qs.stringify(query);
  // }

  return reqParams;
};



module.exports = HttpConnector;




/*


var cleanUp = _.bind(function (err) {
    clearTimeout(timeoutId);

    request && request.removeAllListeners();
    incoming && incoming.removeAllListeners();

    if ((err instanceof Error) === false) {
      err = void 0;
    }

    log.trace(params.method, reqParams, params.body, response, status);
    if (err) {
      cb(err);
    } else {
      cb(err, response, status, headers);
    }
  }, this);

  request = this.hand.request(reqParams, function (_incoming) {
    incoming = _incoming;
    status = incoming.statusCode;
    headers = incoming.headers;
    response = '';

    var encoding = (headers['content-encoding'] || '').toLowerCase();
    if (encoding === 'gzip' || encoding === 'deflate') {
      incoming = incoming.pipe(zlib.createUnzip());
    }

    incoming.setEncoding('utf8');
    incoming.on('data', function (d) {
      response += d;
    });

    incoming.on('error', cleanUp);
    incoming.on('end', cleanUp);
  });

  request.on('error', cleanUp);

  request.setNoDelay(true);
  request.setSocketKeepAlive(true);

  if (params.body) {
    request.setHeader('Content-Length', Buffer.byteLength(params.body, 'utf8'));
    request.end(params.body);
  } else {
    request.setHeader('Content-Length', 0);
    request.end();
  }



*/