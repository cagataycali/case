'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0
var _default = {
  Discount: {
    Rate: function Rate (price, rate) {
      return Math.max(0, price - price * rate / 100)
    },
    Amount: 1
  }
}
exports['default'] = _default
