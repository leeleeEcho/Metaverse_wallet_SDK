var walletSDK = require('../src/index');
var config = require('../src/config');
var utility   = require('../src/utility');

var _walletSDK = new walletSDK(config.fixUrl,"yulong.fang@viewfin.com","qweQWE123");

// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.createAsset("yulong.fang@viewfin.com","qweQWE123").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });
//
//
// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.deleteLocalAsset("test1","123456").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.getAccountAsset("test1","123456","ZGC").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.getAddressAsset("MEhwjsxeqVwPzWFqxzAPcFqnh3HSdgUuS2").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function(err){
//         console.log("err", err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.getNetAsset("yulong.fang@viewfin.com","qweQWE123","symbol").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function (err) {
//         console.log("err",err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.issue("yulong.fang@viewfin.com","qweQWE123","ZNG").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function (err) {
//         console.log("err",err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.issueFrom("yulong.fang@viewfin.com","qweQWE123","M9gzGcJVRgP45K8Jepero79ZoGveg3PhM8","ZGC").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function (err) {
//         console.log("err",err);
//     })
// });


// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.listAssets("yulong.fang@viewfin.com","qweQWE123").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function (err) {
//         console.log("err",err);
//     })
// });



// var ret = _walletSDK.asset.init().then(function () {
//     _walletSDK.asset.sendAsset("yulong.fang@viewfin.com","qweQWE123","M9gzGcJVRgP45K8Jepero79ZoGveg3PhM8","ZGC","1000").then(function (data) {
//         console.log("sdk response", data);
//     }).catch(function (err) {
//         console.log("err",err);
//     })
// });



var ret = _walletSDK.asset.init().then(function () {
    _walletSDK.asset.sendAssetFrom("yulong.fang@viewfin.com","qweQWE123","M9gzGcJVRgP45K8Jepero79ZoGveg3PhM8","MEbtsWfhPEV7XGChVvAoWCyxhpKMZSFFiY","ZGC","1000").then(function (data) {
        console.log("sdk response", data);
    }).catch(function (err) {
        console.log("err",err);
    })
});