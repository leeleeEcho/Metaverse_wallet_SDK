var walletSDK = require('../src/index');
var config = require('../src/config');
var utility = require('../src/utility');

var _walletSDK = new walletSDK(config.fixUrl,"yulong1","123456789");

// var ret = _walletSDK.etp.init().then(function () {
//     _walletSDK.etp.getBalance("fangyulong","123456789").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });


// var ret = _walletSDK.etp.init().then(function () {
//     _walletSDK.etp.listBalances("fangyulong","123456789").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//返回内容不正确sdk response { data: { balances: [ [Object] ] }, status: 200 }


var ret = _walletSDK.etp.init().then(function () {
    _walletSDK.etp.deposit("fangyulong","123456789","10").then(function (data) {
        console.log("sdk response", data);
    }).catch(function(err){
        console.log("err", err);
    })
});
//请求成功，但是返回内容inputs和outputs没有具体内容,只显示Array



// var ret = _walletSDK.etp.init().then(function () {
//     _walletSDK.etp.send("fangyulong","123456789","M8qWKC1VXusfDq1GcF5rZQppQMWgpyvPbe","10").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//请求成功，但是返回内容inputs和outputs没有具体内容,只显示Array


// var ret = _walletSDK.etp.init().then(function () {
//     _walletSDK.etp.sendFrom("fangyulong","123456789","MRTC2p93GTWUfuc5ehMTTJkgMCDJTsm4xT","M8qWKC1VXusfDq1GcF5rZQppQMWgpyvPbe","10").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//请求成功，但是返回内容inputs和outputs没有具体内容,只显示Array


var ret = _walletSDK.etp.init().then(function () {
    _walletSDK.etp.sendMore("yulong1", "123456789", "-r", "M8qWKC1VXusfDq1GcF5rZQppQMWgpyvPbe:1000", "-r", "MHJALPc6HCgFpu8PWPkAXFPMcgBicHoj58:1000").then(function (data) {
        console.log("sdk response", data);
    }).catch(function(err){
        console.log("err", err);
    })
});
//postman以上参数是可以正确调通的，这里返回error: '\'sendMore\' is not a command. Enter \'help\' for a list of commands.'
