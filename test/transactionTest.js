var walletSDK = require('../src/index');
var config = require('../src/config');
var utility = require('../src/utility');

var _walletSDK = new walletSDK(config.fixUrl,"fangyulong","123456789");

var ret = _walletSDK.transaction.init().then(function () {
    _walletSDK.transaction.getTx("fca100ac0524c454762d45ca86aedc0cedb782c27d36780f37239d9e96450d10").then(function (data) {
        console.log("sdk response", data);
    }).catch(function(err){
        console.log("err", err);
    })
});
//inputs和putputs返回都是Object，没有具体内容不合理



// var ret = _walletSDK.transaction.init().then(function () {
//     _walletSDK.transaction.listTxs("fangyulong","123456789").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//返回内容都是Object,不合理