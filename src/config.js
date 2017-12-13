var fixUrl = "http://127.0.0.1:8820";
var env = 'DEV'; // DEV, LIVE, STAGING
var protocol = "rpc";
var rpcProtocol = { jsonrpc :"2.0"};
var Joi   = require('joi');

// change env url
if (env == 'DEV') {
    fixUrl = fixUrl + '/' + protocol;
} else {
    fixUrl = fixUrl + '/' + protocol;
}

var paramsDataSchema    = {
    params:  Joi.array().required(),
    method:    Joi.string().required(),
    id:         Joi.number().required(),
    jsonrpc:      Joi.string().required(),
};


var queueId = function(m,n) {
    "use strict";
    return  Math.floor( Math.random() * ( m - n + 1) + n);
}(1000,0);

var error = {
    // 9xxx
    9999: "Request Error",
    9998: "missing params or invalid param format",
    9997: "invalid format",
    9996: "Get Api Url fail!",
    9995: "Reacquired api address, please again call",

    // 8xxx

};

module.exports = {
    env: env,
    fixUrl: fixUrl,
    error: error,
    rpcProtocol: rpcProtocol,
    queueId: queueId,
    paramsDataSchema: paramsDataSchema
};
