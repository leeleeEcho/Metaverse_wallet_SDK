/**
 * Created by leelee.echo on 2017/12/11.
 */
var walletSDK = require('../src/index');
var config = require('../src/config');
var utility   = require('../src/utility');

var _walletSDK = new walletSDK(config.fixUrl,"test","123456");



var ret = _walletSDK.etp.init().then(function () {
    _walletSDK.transaction.getTx("7cd20505a86400120c82be4f56d3c07a81007d51976dfc5e952296fce95afbad").then(function (data) {
        console.info("sdk response", data);
    }).catch(function(err){
        console.log("err", err);
    })
});


// var ret = _walletSDK.account.init().then(function () {
//     _walletSDK.account.importAccount('test',123456,"add crowd cloth october celery proud valley machine patrol unique left home damp suit category fluid click betray federal spread erupt wealth ice addict").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });

// var ret = _walletSDK.account.init().then(function () {
//     _walletSDK.account.getNewAccount('password').then(function (data) {
//         console.log("data", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//

// var ret = _walletSDK.account.init().then(function () {
//     _walletSDK.account.getListAddress("test","123456").then(function (data) {
//         console.log("data", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });



// var ret = _walletSDK.account.init().then(function () {
//     _walletSDK.account.validateAddress('MEbtsWfhPEV7XGChVvAoWCyxhpKMZSFFiY').then(function (data) {
//         console.log("data", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });

