'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:etp');

function ETP(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

ETP.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


ETP.prototype.getBalance = function(account, password) {
    return this.WalletClient.getBalance(account, password);
};

ETP.prototype.listBalances = function(account, password) {
    return this.WalletClient.listBalances(account, password);
};

ETP.prototype.deposit = function(account, password, amount) {
    return this.WalletClient.deposit(account, password, amount);
};

ETP.prototype.send = function(account, password, toAddress, amount) {
    return this.WalletClient.send(account, password, toAddress, amount);
};

ETP.prototype.sendFrom = function(account, password, fromAddress, toAddress, amount) {
    return this.WalletClient.sendFrom(account, password, fromAddress, toAddress, amount);
};

// TODO: send multi-address loop
ETP.prototype.sendMore = function() {
    return this.WalletClient.sendMore();
};

module.exports = ETP;