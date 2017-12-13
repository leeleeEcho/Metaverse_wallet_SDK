'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:block');

function Block(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

Block.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};


Block.prototype.getBestBlockHash = function() {
    return this.WalletClient.getBestBlockHash();
};

Block.prototype.getBestBlockHeader = function() {
    return this.WalletClient.getBestBlockHeader();
};

Block.prototype.getBlock = function(blockHash) {
    return this.WalletClient.getBlock(blockHash);
};



module.exports = Block;