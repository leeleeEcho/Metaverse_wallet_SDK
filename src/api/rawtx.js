'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:RawTx');

function RawTx(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

RawTx.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};



module.exports = RawTx;