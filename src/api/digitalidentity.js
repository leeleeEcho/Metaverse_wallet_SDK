'use strict';

var WalletClient  = require("../WalletClient");
var _debug    = require('debug');
var debug = _debug('MvsSdk:DigitalIdentity.js');

function DigitalIdentity(apiUrl, accountName, accountAuth) {
    this.WalletClient = new WalletClient(apiUrl, accountName, accountAuth);
}

DigitalIdentity.prototype.init = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.WalletClient.init().then(function(res) {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
};



module.exports = DigitalIdentity;