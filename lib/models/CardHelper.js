'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

var CardHelper =
/* #__PURE__ */
(function () {
  function CardHelper () {
    var products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

    _classCallCheck(this, CardHelper)

    this.products = /* istanbul ignore next */ products
    this.discounts = null
    this.coupon = null
    this.couponDiscount = 0
  }

  _createClass(CardHelper, [{
    key: 'getCampaignDiscounts',
    value: function getCampaignDiscounts (discount) {
      return this.products.find(function (product) {
        return product.discount === discount
      })
    }
  }, {
    key: 'total',
    get: function get () {
      var _total = Object.values(this.products).reduce(function (product, _) {
        return product.total += _.total
      })

      return _total.total || _total
    }
  }, {
    key: 'totalAfterDiscount',
    get: function get () {
      var _total = Object.values(this.products).reduce(function (product, _) {
        return product.priceAfterDiscount += _.priceAfterDiscount
      })

      return _total.priceAfterDiscount || _total
    }
  }, {
    key: 'overallTotal',
    get: function get () {
      return (this.totalAfterDiscount || this.total) - this.couponDiscount
    }
  }, {
    key: 'isCouponUsed',
    get: function get () {
      return this.coupon !== null && this.couponDiscount > 0
    }
  }])

  return CardHelper
}())

exports['default'] = CardHelper
