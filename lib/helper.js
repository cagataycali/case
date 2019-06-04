'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0
var _default = {
  discount: {
    rate: function rate (price, _rate) {
      return Math.max(0, price - price * _rate / 100)
    },
    amount: 1
  }
}
exports['default'] = _default
