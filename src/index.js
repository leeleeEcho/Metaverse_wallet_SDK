'use strict';

var Account    = require('./api/account');
var Blockchain    = require('./api/blockchain');
var Block  = require('./api/block');
var Etp  = require('./api/etp');
var Transaction = require('./api/transaction');
var Asset = require('./api/asset');
var Multisig = require('./api/multisig');
var Rawtx = require('./api/rawtx');
var DigitalIdentity = require('./api/digitalidentity')


function MvsSDKClient(apiUrl, accountName, accountAuth) {
  this.account  = new Account(apiUrl, accountName, accountAuth);
  this.blockChain  = new Blockchain(apiUrl, accountName, accountAuth);
  this.block = new Block(apiUrl, accountName, accountAuth);
  this.etp = new Etp(apiUrl, accountName, accountAuth);
  this.transaction = new Transaction(apiUrl, accountName, accountAuth);
  this.asset = new Asset(apiUrl, accountName, accountAuth);
  this.multisig = new Multisig(apiUrl, accountName, accountAuth);
  this.Rawtx = new Rawtx();
  this.DigitalIdentity = new DigitalIdentity();
}



module.exports = MvsSDKClient;
