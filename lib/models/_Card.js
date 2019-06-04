'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _CardProduct = _interopRequireDefault(require('./CardProduct'))

var _Discount = _interopRequireDefault(require('./Discount'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

var Card =
/* #__PURE__ */
(function () {
  function Card () {
    var products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

    _classCallCheck(this, Card)

    this.products = products
    this.discounts = []
    this.coupons = []
  }

  _createClass(Card, [{
    key: 'addItem',
    value: function addItem (product, quantity) {
      var cardProduct = this.products.find(function (cardProduct) {
        return cardProduct.product === product
      })

      if (!cardProduct) {
        cardProduct = new _CardProduct['default'](product, quantity)
        this.products.push(cardProduct)
      } else {
        cardProduct.quantity += quantity
      }
    }
  }, {
    key: 'removeItem',
    value: function removeItem (product) {
      this.products = this.products.filter(function (cardProduct) {
        return cardProduct.product !== product
      })
    }
  }, {
    key: 'getItems',
    value: function getItems () {
      return this.products
    }
  }, {
    key: 'applyDiscounts',
    value: function applyDiscounts () {
      for (var _len = arguments.length, discounts = new Array(_len), _key = 0; _key < _len; _key++) {
        discounts[_key] = arguments[_key]
      }

      this.discounts = discounts
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
    key: 'campaignDiscount',
    get: function get () {
      /*
              Flatten categories by counting sort.
              For delimiting campaigns.
          */
      var categories = new Map()
      this.products.map(function (_ref) {
        var product = _ref.product

        function findParent (category) {
          categories.set(category.title, categories.get(category.title) + 1 || 1)

          if (category.leaf) {
            findParent(category.parent)
          }
        }

        findParent(product.category)
      }) // Her bir kategoride kaç ürün var.

      console.log(categories) // this.discounts.map(discount => {
      //   console.log(discount)
      //   this.products.map(({ product }) => {
      //     function findParent (category, discounted) {
      //       // Delimiter applied, category match.
      //       if (
      //         discount.delimiter <= categories.get(discount.category.title) &&
      //         product.category.title === category.title
      //       ) {
      //         console.log('kategori eşleşti, sınırlayıcı örtüşüyor, indirim yap.', category.title, discounted)
      //         discounted = discount.apply(discounted)
      //         console.log('yaptım', category.title, discounted, discount.category.title)
      //       }
      //       if (category.leaf) {
      //         findParent(category.parent, discounted)
      //       }
      //     }
      //     findParent(product.category, product.price)
      //     // if (product.category.title === discount.category.title) {
      //     //   console.log('bu kategoride indirim var.')
      //     // }
      //   })
      // })
    }
  }])

  return Card
}())

exports['default'] = Card
