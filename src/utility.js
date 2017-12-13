'use strict';

var Promise   = require("bluebird");
var Joi       = require("joi");
var config    = require("./config");

function getErr(res, code) {
  var error = config.error;
  res.message = (error.hasOwnProperty(code)) ? error[code] : "error code undefined!";
  res.status = code;
  return res;
}

function buildData(cpId, sign, timestamp, params) {
  if (typeof timestamp  === 'object') {
    params = timestamp;
    timestamp = Math.floor(Date.now() / 1000);
  } else {
    params = params || {};
  }

  var data = {
    cp_id: cpId,
    timestamp: timestamp,
    sign: sign
  };
   
  return Object.assign(data, params);
}

function validateInt(val, maxVal, minVal) {
  val = parseInt(val);
  minVal = (minVal !== undefined) ? minVal : 1;

  return !(val < minVal || val > maxVal);
}

function validateString(val, maxLen, minLen) {
  minLen = (minLen && minLen !== undefined) ? minLen : 1;

  return !(val.length < minLen || val.length > maxLen);
}

// validate strict time ,ex: YYYY-mm-dd HH:ii:ss
function validateStrictTime(time) {
  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
  var r = time.match(reg); 

  return (r !== null);
}

function validateIp(ipAddress) {
  var schema = Joi.object().keys({
    ip: Joi.string().ip({ version: ['ipv4'] })
  });

  Joi.validate({ ip: ipAddress }, schema, function (err, value) {
    return !err;
  });
}

function collectObj() {
  var ret = {};
  var len = arguments.length;

  for (var i = 0; i < len; i++) {
    for (var p in arguments[i]) {
      if (arguments[i].hasOwnProperty(p)) {
        ret[p] = arguments[i][p];
      }
    }
  }

  return ret;
}

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

function handleUrlPara(urlPara, urlParaDict) {
  var urlParaArray = [];
  for (var i in urlParaDict) {
    var key = urlParaDict[i];
    urlParaArray[key] = (urlPara[key] === undefined) ? "" : urlPara[key];
  }
  return urlParaArray;
}


module.exports = {
  getErr: getErr,
  buildData: buildData,
  joiValidate: Promise.promisify(Joi.validate),
  validateInt: validateInt,
  validateString: validateString,
  validateStrictTime: validateStrictTime,
  validateIp: validateIp,
  collectObj: collectObj,
  getTimeStamp: getTimeStamp,
  handleUrlPara: handleUrlPara
};
