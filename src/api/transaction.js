'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:transaction');

function Transaction(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

Transaction.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


Transaction.prototype.getTx = function(txHash) {
    return this.WalletClient.getTx(txHash);
};

//TODO: add optional Parameters
Transaction.prototype.listTxs = function(account, password) {
    return this.WalletClient.listTxs(account, password);
};


module.exports = Transaction;