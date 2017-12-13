'use strict';

var walletClient  = require("../walletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:account');

function Account(apiUrl, accountName, accountAuth) {
    this.walletClient = new walletClient(apiUrl, accountName, accountAuth);
}

Account.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.walletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


Account.prototype.getNewAccount = function(newAccount, newAuth, language) {
    return this.walletClient.getNewAccount(newAccount, newAuth,  language || "en");
};

Account.prototype.getNewAddress = function(amount) {
    return this.walletClient.getNewAddress(amount || 1);
};

Account.prototype.getListAddress = function(account, password) {
    return this.walletClient.getListAddress(account, password);
};

Account.prototype.validateAddress = function(walletAddress) {
    return this.walletClient.validateAddress(walletAddress);
};

Account.prototype.importAccount = function(account, password, word, index, language) {
    return this.walletClient.importAccount(account, password, word, index || 1, language || "en");
};

Account.prototype.importKeyFile = function(filePath, password) {
    return this.walletClient.importKeyFile(filePath, password);
};

Account.prototype.dumpKeyFile = function(account, password, lastWord, filePath) {
    return this.walletClient.dumpKeyFile(account, password, lastWord, filePath);
};

Account.prototype.changePassword = function(account, password, newPassword) {
    return this.walletClient.changePassword(account, password, newPassword);
};

Account.prototype.deleteAccount = function(account, password, lastWord) {
    return this.walletClient.deleteAccount(account, password, lastWord);
};

Account.prototype.getAccount = function(account, password, lastWord) {
    return this.walletClient.getAccount(account, password, lastWord);
};



module.exports = Account;