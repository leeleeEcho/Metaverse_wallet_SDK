'use strict';

var walletClient  = require("../walletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:blockchain');

function blockChain(apiUrl, accountName, accountAuth) {
    this.walletClient = new walletClient(apiUrl, accountName, accountAuth);
}

blockChain.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.walletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


blockChain.prototype.shutDown = function(account, password) {
    return this.walletClient.shutDown(account, password);
};

blockChain.prototype.startMining = function(account, password) {
    return this.walletClient.startMining(account, password);
};

blockChain.prototype.stopMining = function(account, password) {
    return this.walletClient.stopMining(account, password);
};

blockChain.prototype.getWork = function() {
    return this.walletClient.getWork();
};

blockChain.prototype.setMiningAccount = function(account, password, paymentAddress) {
    return this.walletClient.getWork(account, password, paymentAddress);
};

blockChain.prototype.submitWork = function(bounce, headerHash, mixHash) {
    return this.walletClient.submitWork(bounce, headerHash, mixHash);
};

blockChain.prototype.setMiningAccount = function() {
    return this.walletClient.setMiningAccount();
};

module.exports = blockChain;