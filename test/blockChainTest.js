var walletSDK = require('../src/index');
var config = require('../src/config');
var utility = require('../src/utility');

var _walletSDK = new walletSDK(config.fixUrl,"yulong1","123456789");


// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.shutDown("administrator","administrator").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });



var ret = _walletSDK.blockChain.init().then(function () {
    _walletSDK.blockChain.startMining("fangyulong","123456789").then(function (data) {
        console.log("sdk response", data);
    }).catch(function(err){
        console.log("err", err);
    })
});
//返回code: 1021,    error: '\'startmining\' is not a command. Enter \'help\' for a list of commands.',



// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.stopMining("fangyulong","123456789").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//返回code: 1021,    error: '\'startmining\' is not a command. Enter \'help\' for a list of commands.',




// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.getWork().then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });


// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.setMiningAccount("fanyulong","123456789","MPRW1B7ALZttDUPBahEJrHm7ToPf2EFMXM").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//返回没有内容  sdk response { data: { transactions: '' }, status: 200 }   正确返回应该是setting address [MPRW1B7ALZttDUPBahEJrHm7ToPf2EFMXM] successfully.



// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.submitWork("","","").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });



// var ret = _walletSDK.blockChain.init().then(function () {
//     _walletSDK.blockChain.getmemorypool().then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//getmemorypool函数WalletClient中未定义
