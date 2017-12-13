'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:asset');

function Asset(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

Asset.prototype.init = function() {
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
Asset.prototype.createAsset = function(account, password) {
    return this.WalletClient.createAsset(account, password);
};

Asset.prototype.deleteLocalAsset = function(account, password) {
    return this.WalletClient.deleteLocalAsset(account, password);
};

Asset.prototype.getAccountAsset = function(account, password, symbol) {
    return this.WalletClient.getAccountAsset(account, password, symbol);
};

Asset.prototype.getAddressAsset = function(address) {
    return this.WalletClient.getAddressAsset(address);
};

Asset.prototype.getNetAsset = function(account, password, symbol) {
    return this.WalletClient.getNetAsset(account, password, symbol);
};

//TODO: add optional Parameters
Asset.prototype.issue = function(account, password, symbol) {
    return this.WalletClient.issue(account, password, symbol);
};

//TODO: add optional Parameters
Asset.prototype.issueFrom = function(account, password, address, symbol) {
    return this.WalletClient.issueFrom(account, password, address, symbol);
};

Asset.prototype.listAssets = function(account, password) {
    return this.WalletClient.listAssets(account, password);
};

//TODO: add optional Parameters
Asset.prototype.sendAsset = function(account, password, address, symbol, amount) {
    return this.WalletClient.sendAsset(account, password, address, symbol, amount);
};

//TODO: add optional Parameters
Asset.prototype.sendAssetFrom = function(account, password, fromAddress, toAddress, symbol, amount) {
    return this.WalletClient.sendAssetFrom(account, password, fromAddress, toAddress, symbol, amount);
};






module.exports = Asset;