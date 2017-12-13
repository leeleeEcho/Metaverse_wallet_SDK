'use strict';

var _debug    = require('debug');
var Promise   = require('bluebird');
var Request   = require('request');
var config    = require('./config');
var utility   = require('./utility');
var debug = _debug('SzSdk:platform');
var postAsync = Promise.promisify(Request.post);
var md5 = require('js-md5');

function WalletClient(fixUrl, accountName, accountAuth) {
  this.accountName     = accountName;
  this.accountAuth    = accountAuth;
  this.url      = fixUrl;
  this.schmea = config.paramsDataSchema;
  this.res      = {
    data: {},
    message: '',
    status: 0
  };
  this.initParamsData = function( method ){
    return Object.assign( config.rpcProtocol,
                        { method: method || "",  id: config.queueId });
  }
}

WalletClient.prototype.init = function(needConnect) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    try {
      resolve();
    } catch(err) {
      if (needConnect === false) {
        resolve();
      } else {
        resolve();
      }
    }
  });
};


/**
 * getNewAccount
 * Generate a new account from this wallet.
 * Parameters (optional)
 * -l or [--language] Options are ‘en’, ‘es’, ‘ja’, ‘zh_Hans’, ‘zh_Hant’ and ‘any’, defaults to ‘en’.
 * Parameters (positional)
 * ACCOUNTNAME Account name.
 * ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.getNewAccount = function(newAccount, newAuth, lang) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getnewaccount") || {},
        { params :["-l", lang, newAccount, newAuth] });
    return _this.handleRequest(_this.url, paramsData);
}


/**
 * getnewaddress
 * Generate new address for this account.
 * Parameters (optional)
 * -n or [--number] The address count.
 * Parameters (positional)
 * ACCOUNTNAME Account name.
 *    ACCOUNTAUTH Account password/authorization.
 * params:[
 *    "ACCOUNTNAME",
 *    "ACCOUNTAUTH"
 *  ]
 */

WalletClient.prototype.getNewAddress = function(amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getnewaddress") || {},
        { params :["-n", amount, _this.accountName, _this.accountAuth] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * List available addresses of this account.
 *     Parameters (positional)
 *     ACCOUNTNAME Account name.
 *     ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.getListAddress = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("listaddresses") || {},
        { params :[account, password] });
    return _this.handleRequest(_this.url, paramsData);
}


/**
 * validateaddress
 *     validate address
 *     Parameters (positional)
 *     ACCOUNTNAME Account name.
 *     ACCOUNTAUTH Account password/authorization.
 *     ADDRESS address
 */

WalletClient.prototype.validateAddress = function(walletAddress) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("validateaddress") || {},
        { params :[ _this.accountName,  _this.accountAuth,  walletAddress || "" , ] });
    return _this.handleRequest(_this.url, paramsData, "STRING"); // TODO: RPC response not JSON format!!
}


/**
 * importaccount
 *  Parameters (optional)
 *   -i or [--hd_index] Teh HD index for the account.
 *   -l or [--language] The language identifier of the dictionary of the mnemonic. Options are ‘en’, ‘es’, ‘ja’, ‘zh_Hans’, ‘zh_Hant’ and ‘any’, defaults to ‘any’.
 *   -n or [--accoutname] Account name.
 *   -p or [--password] Account password.
 *   Parameters (positional)
 *     WORD The set of words that that make up the mnemonic. If not specified the words are read from STDIN.
 */

WalletClient.prototype.importAccount = function(account, password, word, index, language) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("importaccount") || {},
        { params :["-i", index, "-l", language, "-n", account, "-p", password, "--WORD", word] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}



/**
 * importkeyfile
 *     importaccountfromfile
 *   Parameters (positional)
 *   FILE account info file
 *   PASSWORD password used to dencrypt account info file
 *   params:[
 *   "FILE",
 *   "PASSWORD"
 *   ]
 */

WalletClient.prototype.importKeyFile = function(filePath, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("importaccountfromfile") || {},
        { params : [filePath, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * export account as file
 *   Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   LASTWORD The last word of your master private-key phrase.
 *   DESTINATION account info storage file path
 */

WalletClient.prototype.dumpKeyFile = function(account, password, lastWord, filePath) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("dumpkeyfile") || {},
        { params : [account, password, lastWord, filePath] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * changepasswd
 *    changepasswd
 *    Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   NEWPASSWD New password/authorization.
 */

WalletClient.prototype.changePassword = function(account, password, newPassword) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("changepasswd") || {},
        { params : [account, password, newPassword] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * deleteaccount
 *     deleteaccount
 *     Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   LASTWORD The last word of your private-key phrase.
 */

WalletClient.prototype.deleteAccount = function(account, password, lastWord) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("deleteaccount") || {},
        { params : [account, password, lastWord] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * getaccount
 *    Show account details
 *    Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   LASTWORD The last word of your master private-key phrase.
 */

WalletClient.prototype.getAccount = function(account, password, lastWord) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getaccount") || {},
        { params : [account, password, lastWord] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * shutdown
 *  stop mvsd.
 *  Parameters (positional)
 *  ADMINNAME admin name.
 *  ADMINAUTH admin password/authorization.
 */

WalletClient.prototype.shutDown = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("stopall") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * shutdown
 *  stop mvsd.
 *  Parameters (positional)
 *  ADMINNAME admin name.
 *  ADMINAUTH admin password/authorization.
 */

WalletClient.prototype.shutDown = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("stopall") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * startmining
 *    start solo mining.
 *    Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.startMining = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("startmining") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * stopmining
 *    stop solo mining.
 *    Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.stopMining = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("stopmining") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * getwork to get mining info
 *    Returns
 *     Object
 */

WalletClient.prototype.getWork = function() {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getwork") || {},
        { params : [] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * setminingaccount
 *     setmining account when pool mining.
 *   Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   PAYMENT_ADDRESS the payment address of this account.
 */

WalletClient.prototype.setMiningAccount = function(account, password, paymentAddress) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("setminingaccount") || {},
        { params : [account, password, paymentAddress] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * submitwork
 *      submitwork to submit mining result.
 *   Parameters (positional)
 *    NOUNCE nounce.
 *   HEADERHASH header hash.
 *   MIXHASH mix hash.
 */

WalletClient.prototype.submitWork = function(bounce, headerHash, mixHash) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("submitwork") || {},
        { params : [bounce, headerHash, mixHash] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}

/**
 * getmemorypool
 *    Returns all transactions in memory pool.
 *    Returns
 *   Array - list of transactions
 */

WalletClient.prototype.setMiningAccount = function() {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getmemorypool") || {},
        { params : [] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getbestblockhash
 *  get best blockhash
 *      Returns
 *  String - best block hash
 */

WalletClient.prototype.getBestBlockHash = function() {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getbestblockhash") || {},
        { params : [] });
    return _this.handleRequest(_this.url, paramsData, "STRING");
}



/**
 * getbestblockhash
 *  get best blockhash
 *      Returns
 *  String - best block hash
 */

WalletClient.prototype.getBestBlockHash = function() {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getbestblockhash") || {},
        { params : [] });
    return _this.handleRequest(_this.url, paramsData, "STRING");
}


/**
 * getbestblockheader
 *    get best blockheader
 *   Returns
 *   Object - best block header
 */

WalletClient.prototype.getBestBlockHeader = function() {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getbestblockheader") || {},
        { params : [] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getblock
 *    Get sepcified block header from wallet.
 *  Parameters (positional)
 *      HASH block hash.
 *       JSON use json format or not, default is falser
 */

WalletClient.prototype.getBlock = function(blockHash) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getblock") || {},
        { params : [blockHash, "--json", "true"] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}





/**
 *   getbalance
 *   Show total balance details of this account.
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.getBalance = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getbalance") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}



/**
 *   listbalances
 *       List all balance details of each address of this account.
 *       Parameters (optional)
 *       -n or [--nozero] List non-zero upsent records.
 *       Parameters (positional)
 *       ACCOUNTNAME Account name.
 *       ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.listBalances = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("listbalances") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}



/**
 *   deposit
 *       Deposit some etp, then get reward for frozen some etp.
 *        Parameters (optional)
 *       -a or [--address] The deposit target address.
 *       -d or [--deposit] Deposits support [7, 30, 90, 182, 365] days. defaluts to 7 days
 *       -f or [--fee] The fee of tx. default_value 0.0001 etp
 *      Parameters (positional)
 *       ACCOUNTNAME Account name.
 *          ACCOUNTAUTH Account password/authorization.
 *        AMOUNT How many you will deposit.
 */

WalletClient.prototype.deposit = function(account, password, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("deposit") || {},
        { params : [account, password, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 *   send
 *       send etp to a targert address, mychange goes to another existed address of this account.
 *       Parameters (optional)
 *       -f or [--fee] The fee of tx. default_value 0.0001 etp
 *       -m or [--memo] The memo to descript transaction
 *       Parameters (positional)
 *       ACCOUNTNAME Account name.
 *       ACCOUNTAUTH Account password/authorization.
 *       TOADDRESS Send to this address
 *       AMOUNT How many you will spend
 */

WalletClient.prototype.send = function(account, password, toAddress, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("send") || {},
        { params : [account, password, toAddress, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * sendfrom
 *    send etp from a specified address of this account to target address, mychange goes to from_address.
 *   Parameters (optional)
 *      -f or [--fee] The fee of tx. default_value 0.0001 etp
 *      -m or [--memo] The memo to descript transaction
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *      FROMADDRESS Send from this address
 *      TOADDRESS Send to this address
 *      AMOUNT How many you will spend
 */

WalletClient.prototype.sendFrom = function(account, password, fromAddress, toAddress, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("sendfrom") || {},
        { params : [account, password, fromAddress, toAddress, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * sendmore
 *    send etp to multi target addresses, must specify mychange address.
 *   Parameters (optional)
 *   -f or [--fee] The fee of tx. default_value 0.0001 etp
 *   -m or [--mychange] Mychange to this address
 *   -r or [--receivers] Send to [address:amount]
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.sendMore = function(account, password, fromAddress, toAddress, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("sendMore") || {},
        { params : [account, password, fromAddress, toAddress, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * gettx
 *    gettransaction
 *   Parameters (positional)
 *   HASH The Base16 transaction hash of the transaction to get. If not specified the transaction hash is read from STDIN.
 */

WalletClient.prototype.getTx = function(txHash) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("gettransaction") || {},
        { params : [txHash] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * gettx
 *    gettransaction
 *   Parameters (positional)
 *   HASH The Base16 transaction hash of the transaction to get. If not specified the transaction hash is read from STDIN.
 */

WalletClient.prototype.getTx = function(txHash) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("gettransaction") || {},
        { params : [txHash] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * listtxs
 *    List transactions details of this account.
 *   Parameters (optional)
 *   -a or [--address] Address.
 *   -e or [--height] Get tx according height. eg: -e start-height:end-height will return tx between [start-height, end-height)
 *   -i or [--index] Page index.
 *   -l or [--limit] Transaction count per page.
 *   -s or [--symbol] Asset symbol.
 *   Parameters (positional)
 *       ACCOUNTNAME Account name.
 *       ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.listTxs = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("listtxs") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * createasset
 *    Parameters (optional)
 *   -d or [--description] The asset description.
 *   -i or [--issuer] The asset issuer.defaults to account name.
 *   -n or [--decimalnumber] The asset amount decimal number.
 *   -s or [--symbol] The asset symbol/name. Global unique.
 *   -v or [--volume] The asset maximum supply volume.
 *   Parameters (positional)
 *    ACCOUNTNAME Account name.
 *    ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.createAsset = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("createasset") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * deletelocalasset
 *     deleteunissuedasset
 *   Parameters (optional)
 *   -s or [--symbol] The asset symbol/name. Global unique.
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.deleteLocalAsset = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("deleteunissuedasset") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getaccountasset
 *     getaccountasset
 *   Parameters (positional)
 *     ACCOUNTNAME Account name.
 *     ACCOUNTAUTH Account password/authorization.
 *      SYMBOL Asset symbol.   eg: ZGC / ZNG / ETP
 */

WalletClient.prototype.getAccountAsset = function(account, password, symbol) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getaccountasset") || {},
        { params : [account, password, symbol] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getaddressasset
 *  Parameters (positional)
 *  ADDRESS address
 *
 */

WalletClient.prototype.getAddressAsset = function(address) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getaddressasset") || {},
        { params : [address] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getnetasset
 *    getasset
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *      SYMBOL Asset symbol.
 */

WalletClient.prototype.getNetAsset = function(account, password, symbol) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getasset") || {},
        { params : [account, password, symbol] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * issue
 *    issue
 *   Parameters (optional)
 *   -f or [--fee] The fee of tx. default_value 10 etp
 *   Parameters (positional)
 *       ACCOUNTNAME Account name.
 *       ACCOUNTAUTH Account password/authorization.
 *       SYMBOL issued asset symbol
 */

WalletClient.prototype.issue = function(account, password, symbol) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("issue") || {},
        { params : [account, password, symbol] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * issuefrom
 *    issuefrom
 *   Parameters (optional)
 *   -f or [--fee] The fee of tx. default_value 10 etp
 *   Parameters (positional)
 *    ACCOUNTNAME Account name.
 *    ACCOUNTAUTH Account password/authorization.
 *    ADDRESS target address
 *    SYMBOL issued asset symbol
 */

WalletClient.prototype.issueFrom = function(account, password, address, symbol) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("issuefrom") || {},
        { params : [account, password, address, symbol] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * listassets
 *     list assets details.
 *   Parameters (positional)
 *       ACCOUNTNAME Account name.
 *       ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.listAssets = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("listassets") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * sendasset
 *     sendasset
 *   Parameters (optional)
 *      -f or [--fee] The fee of tx. default_value 0.0001 etp
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *      ADDRESS Asset receiver.
 *       SYMBOL Asset symbol/name.
 *       AMOUNT Asset count.
 */

WalletClient.prototype.sendAsset = function(account, password, address, symbol, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("sendasset") || {},
        { params : [account, password, address, symbol, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * sendassetfrom
 *      sendassetfrom
 *   Parameters (optional)
 *   -f or [--fee] The fee of tx. default_value 0.0001 etp
 *   Parameters (positional)
 *   ACCOUNTNAME Account name.
 *   ACCOUNTAUTH Account password/authorization.
 *   FROMADDRESS from address
 *   TOADDRESS target address
 *   SYMBOL asset symbol
 *   AMOUNT The asset amount shares
 */

WalletClient.prototype.sendAssetFrom = function(account, password, fromAddress, toAddress, symbol, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("sendassetfrom") || {},
        { params : [account, password, fromAddress, toAddress, symbol, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 *  createmultisigtx
 *      createmultisigtx
 *    Parameters (optional)
 *      -f or [--fee] The fee of tx. default_value 0.0001 etp
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *       FROMADDRESS Send from this address
 *      TOADDRESS Send to this address
 *      AMOUNT How many you will spend
 */

WalletClient.prototype.createMultisigtx = function(account, password, fromAddress, toAddress, amount) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("createmultisigtx") || {},
        { params : [account, password, fromAddress, toAddress, amount] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * deletemultisig
 *    deletemultisig
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *       ADDRESS The multisig script corresponding address.
 */

WalletClient.prototype.deleteMultisig = function(account, password, address) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("deletemultisig") || {},
        { params : [account, password, address] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * getnewmultisig
 *    getnewmultisig
 *   Parameters (optional)
 *   -d or [--description] multisig record description.
 *   -k or [--publickey] cosigner public key used for multisig
 *   -m or [--signaturenum] Account multisig signature number.
 *   -n or [--publickeynum] Account multisig public key number.
 *   -s or [--selfpublickey] the public key belongs to this account.
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *
 */

WalletClient.prototype.getNewMultisig = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("getnewmultisig") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * listmultisig
 * listmultisig
 *  Parameters (positional)
 *   ACCOUNTNAME Account name.
 *  ACCOUNTAUTH Account password/authorization.
 */

WalletClient.prototype.listMultisig = function(account, password) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("listmultisig") || {},
        { params : [account, password] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}


/**
 * signmultisigtx
 *   signmultisigtx
 *   Parameters (optional)
 *      -b or [--broadcast] Broadcast the tx if it is fullly signed.
 *   Parameters (positional)
 *      ACCOUNTNAME Account name.
 *      ACCOUNTAUTH Account password/authorization.
 *      TRANSACTION The input Base16 transaction to sign.
 */

WalletClient.prototype.signMultisigTx = function(account, password, txId) {
    var _this = this;
    var paramsData = Object.assign( _this.initParamsData("signmultisigtx") || {},
        { params : [account, password, txId] });
    return _this.handleRequest(_this.url, paramsData, "JSON");
}



/*
    handleRequest
 */

WalletClient.prototype.handleRequest = function(url, formData, resDataType) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    utility.joiValidate(formData, _this.schmea, { allowUnknown: true }).then(function(val) {
      return postAsync({ url: url, form: JSON.stringify(formData) }).then(function(response) {
        try {
          var body = resDataType == "JSON" ? JSON.parse(response.body) : resDataType == "STRING" ? response.body : JSON.parse(response.body);
          var res = {
            data: body,
            status: body.code || 200
          };
          resolve(res)
        } catch (e) {
          throw new Error('invalid json body!');
        }
      }).catch(function(err) {
          console.log("err", err);
        _this.init().then(function(res) {
          reject(utility.getErr(_this.res, '9996'));
        }).catch(function(err) {
          reject(utility.getErr(_this.res, '9999'));
        });
      });
    }).catch(function(err) {
      resolve(utility.getErr(_this.res, '9998'));
    })
  });
};

module.exports = WalletClient;
