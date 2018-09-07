'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _hookedWallet = require('./hooked-wallet');

var _hookedWallet2 = _interopRequireDefault(_hookedWallet);

var _TrezorWallet = require('./TrezorWallet');

var _TrezorWallet2 = _interopRequireDefault(_TrezorWallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(networkId, pathOverride) {
    var trezor, TrezorWalletSubprovider;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (networkId == null) {
              networkId = 1; //default to mainnet network id
            }
            trezor = new _TrezorWallet2.default(networkId, pathOverride);
            TrezorWalletSubprovider = new _hookedWallet2.default(trezor);

            TrezorWalletSubprovider.trezor = trezor;

            return _context.abrupt('return', TrezorWalletSubprovider);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();