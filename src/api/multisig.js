'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:multisig');

function Multisig(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

Multisig.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


//TODO: add optional Parameters
Multisig.prototype.createMultisigtx = function(account, password, fromAddress, toAddress, amount) {
    return this.WalletClient.createMultisigtx(account, password, fromAddress, toAddress, amount);
};

Multisig.prototype.deleteMultisig = function(account, password, address) {
    return this.WalletClient.deleteMultisig(account, password, address);
};

Multisig.prototype.getNewMultisig = function(account, password) {
    return this.WalletClient.getNewMultisig(account, password);
};

Multisig.prototype.listMultisig = function(account, password) {
    return this.WalletClient.listMultisig(account, password);
};

//TODO: add optional Parameters
Multisig.prototype.signMultisigTx = function(account, password, txId) {
    return this.WalletClient.signMultisigTx(account, password, txId);
};





module.exports = Multisig;