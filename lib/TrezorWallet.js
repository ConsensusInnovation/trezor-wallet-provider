'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

var _hdkey = require('ethereumjs-wallet/hdkey');

var _hdkey2 = _interopRequireDefault(_hdkey);

var _trezorConnect = require('./trezorConnect');

var _trezorConnect2 = _interopRequireDefault(_trezorConnect);

var _ethereumjsUtil = require('ethereumjs-util');

var ethUtil = _interopRequireWildcard(_ethereumjsUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrezorWallet = function () {
  function TrezorWallet(networkId, path) {
    (0, _classCallCheck3.default)(this, TrezorWallet);

    this.networkId = networkId; // Function which should return networkId
    this.getAccounts = this.getAccounts.bind(this);
    this.getMultipleAccounts = this.getMultipleAccounts.bind(this);
    this.signTransaction = this.signTransaction.bind(this);
    this.setDerivationPath = this.setDerivationPath.bind(this);
    this.signMessage = this.signMessage.bind(this);
    this.setDerivationPath(path);
    this.setAccountNumber = this.setAccountNumber.bind(this);
    this.setAccountNumber(0);
  }

  (0, _createClass3.default)(TrezorWallet, [{
    key: 'setAccountNumber',
    value: function setAccountNumber(number) {
      this.currentAccountNumer = number || 0;
    }
  }, {
    key: 'setDerivationPath',
    value: function setDerivationPath(path) {
      var newPath = path || "44'/60'/0'/0"; // default path for trezor

      this.path = newPath;
    }
  }, {
    key: 'getPublicKey',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _trezorConnect2.default.getXPubKey(_this.path, function (r) {
                    if (!r.success) {
                      reject(r.error);
                    }
                    resolve(r.xpubkey);
                  });
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPublicKey() {
        return _ref.apply(this, arguments);
      }

      return getPublicKey;
    }()
  }, {
    key: 'getMultipleAccounts',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(derivationPath, indexOffset, accountLength) {
        var key, accounts, i, wallet;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.getPublicKey();

              case 3:
                key = _context2.sent;
                accounts = [];

                for (i = indexOffset; i < indexOffset + accountLength; i += 1) {
                  wallet = _hdkey2.default.fromExtendedKey(key).deriveChild(i);

                  accounts.push(wallet.getWallet().getAddressString());
                };
                return _context2.abrupt('return', _promise2.default.resolve(accounts));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _promise2.default.reject(_context2.t0));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function getMultipleAccounts(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getMultipleAccounts;
    }()
  }, {
    key: 'signTransactionAsync',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(txData) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
                  //// Uncomment for debugging purposes:
                  // TrezorConnect.closeAfterFailure(false);
                  // TrezorConnect.closeAfterSuccess(false);

                  // Set the EIP155 bits
                  var tx = new _ethereumjsTx2.default(txData);
                  tx.raw[6] = Buffer.from([_this2.networkId]); // v
                  tx.raw[7] = Buffer.from([]); // r
                  tx.raw[8] = Buffer.from([]); // s

                  _trezorConnect2.default.ethereumSignTx(_this2.path + '/' + _this2.currentAccountNumer, TrezorWallet.makeHexEven(txData.nonce), TrezorWallet.makeHexEven(txData.gasPrice), TrezorWallet.makeHexEven(txData.gas), TrezorWallet.makeHexEven(txData.to), TrezorWallet.makeHexEven(txData.value), TrezorWallet.makeHexEven(txData.data), _this2.networkId, function (r) {
                    console.log(r);
                    if (r.success) {
                      console.log((0, _typeof3.default)(r.v));
                      tx.v = Buffer.from(r.v.toString(16), 'hex');
                      tx.r = Buffer.from(r.r, 'hex');
                      tx.s = Buffer.from(r.s, 'hex');
                    } else {
                      reject(r.error); // error message
                    }
                    console.log('0x' + tx.serialize().toString('hex'));
                    // return signed transaction
                    resolve('0x' + tx.serialize().toString('hex'));
                  });
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function signTransactionAsync(_x4) {
        return _ref3.apply(this, arguments);
      }

      return signTransactionAsync;
    }()
  }, {
    key: 'signMessageAsync',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(msgData) {
        var _this3 = this;

        var message;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                message = msgData.data;

                if (msgData.data.substr(0, 2) === '0x') {
                  message = ethUtil.toBuffer(message);
                }
                return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _trezorConnect2.default.ethereumSignMessage(_this3.path + '/' + _this3.currentAccountNumer, message, function (r) {
                    if (!r.success) {
                      reject(r.error);
                    } else {
                      resolve(r.signature);
                    }
                  });
                }));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function signMessageAsync(_x5) {
        return _ref4.apply(this, arguments);
      }

      return signMessageAsync;
    }()

    // Prepend 0 in case of uneven hex char count

  }, {
    key: 'getAccounts',


    /**
       * Gets a list of accounts from a device - currently it's returning just
       * first one according to derivation path
       * @param {failableCallback} callback
       */
    value: function getAccounts(callback) {
      this.getMultipleAccounts(this.path, 0, 5).then(function (res) {
        return callback(null, res);
      }).catch(function (err) {
        return callback(err, null);
      });
    }

    /**
       * Signs txData in a format that ethereumjs-tx accepts
       * @param {object} txData - transaction to sign
       * @param {failableCallback} callback - callback
       */

  }, {
    key: 'signTransaction',
    value: function signTransaction(txData, callback) {
      this.signTransactionAsync(txData).then(function (res) {
        return callback(null, res);
      }).catch(function (err) {
        return callback(err, null);
      });
    }
  }, {
    key: 'signMessage',
    value: function signMessage(txData, callback) {
      this.signMessageAsync(txData).then(function (res) {
        return callback(null, res);
      }).catch(function (err) {
        callback(err, null);
      });
    }
  }], [{
    key: 'obtainPathComponentsFromDerivationPath',
    value: function obtainPathComponentsFromDerivationPath(derivationPath) {
      // check if derivation path follows 44'/60'/x'/n pattern
      var regExp = /^(44'\/6[0|1]'\/\d+'?\/)(\d+)$/;
      var matchResult = regExp.exec(derivationPath);
      if (matchResult === null) {
        throw new Error("To get multiple accounts your derivation path must follow pattern 44'/60|61'/x'/n ");
      }

      return { basePath: matchResult[1], index: parseInt(matchResult[2], 10) };
    }
  }, {
    key: 'makeHexEven',
    value: function makeHexEven(input) {
      console.log(input);
      var output = void 0;
      if (input.length % 2 !== 0) {
        output = '0' + input.slice(2);
      } else {
        output = input.slice(2);
      }
      console.log(output);
      return output;
    }
  }]);
  return TrezorWallet;
}();

exports.default = TrezorWallet;