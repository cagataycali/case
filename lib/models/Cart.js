"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CartHelper2 = _interopRequireDefault(require("./CartHelper"));

var _CartProduct = _interopRequireDefault(require("./CartProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Class representing a shopping cart.
 * @extends CartHelper
 */
var Cart =
/*#__PURE__*/
function (_CartHelper) {
  _inherits(Cart, _CartHelper);

  /**
   * Create Cart.
   * @param {Array.<Product>} products - Creates empty products, bind parent helper.
   */
  function Cart() {
    var _this;

    var products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Cart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cart).call(this, products));
    _this.totalSavingViaCampaign = 0;
    _this.couponDiscount = 0;
    _this.campaignUsed = false;
    return _this;
  }
  /**
   * Adds products into shopping cart if does not exists,
   * If exists, calculate quantity, total and etc.
   * @param {Product} product
   * @param {number} quantity
   */


  _createClass(Cart, [{
    key: "addItem",
    value: function addItem(product, quantity) {
      var cartProduct = this.products.find(function (cartProduct) {
        return cartProduct.product === product;
      });

      if (!cartProduct) {
        this.products.push(new _CartProduct["default"](product, quantity));
      } else {
        cartProduct.quantity += quantity;
      }
    }
    /**
     * Find related product in cart products,
     * Remove and calculate total like properties.
     * @param {Product} product
     */

  }, {
    key: "removeItem",
    value: function removeItem(product) {
      if (product instanceof _CartProduct["default"]) {
        product = product.product;
      }

      this.products = this.products.filter(function (_ref) {
        var _product = _ref.product;
        return _product !== product;
      });
    }
    /**
     * Simply, applies discounts,
     * Flatten the categories via counting sort, check delimits of discount.
     * If can find the best discount on product, apply and calculate total amount.
     * @param  {...Campaign} discounts
     */

  }, {
    key: "applyDiscounts",
    value: function applyDiscounts() {
      var _this2 = this;

      for (var _len = arguments.length, discounts = new Array(_len), _key = 0; _key < _len; _key++) {
        discounts[_key] = arguments[_key];
      }

      this.discounts = discounts;

      if (this.campaignUsed) {
        throw new Error('Campaign used before');
      }

      if (this.couponDiscount > 0) {
        throw new Error('Campaign can not applicable after using coupon.');
      }
      /*
        Flatten categories via counting sort.
        For delimiting campaigns.
      */


      var categories = new Map();
      this.products.map(function (cartProduct) {
        var _quantity = cartProduct._quantity,
            product = cartProduct.product;

        function findParent(category) {
          categories.set(category.title, categories.get(category.title) + 1 || _quantity);

          if (category.leaf) {
            findParent(category.parent);
          }
        }

        findParent(product.category);
      });
      this.products.map(function (cartProduct) {
        var product = cartProduct.product;
        var total = cartProduct.total;
        var min = cartProduct.total;
        var selectedDiscount;
        /*
          findBestDiscount: inline function, is a recursion till find category parent.
          It tries to find the most appropriate campaign by checking the campaign limits.
        */

        var findBestDiscount = function findBestDiscount(category) {
          // Find spesified category discount
          var discount = _this2.discounts.find(function (discount) {
            return discount.category.title === category.title;
          }); // Should I apply campaign to the product? -optimistic


          var apply = true;

          if (discount && discount.apply(total) < min) {
            // Apply discount only delimiter fits the campaign
            apply = (discount.type === 'rate' ? categories.get(category.title) : total) >= discount.delimiter; // Gotcha!

            if (apply) {
              min = discount.apply(total);
              selectedDiscount = discount;
              _this2.campaignUsed = true;
            }
          } // I'm awaiting your parents to school tomorrow.


          if (category.leaf) {
            findBestDiscount(category.parent);
          }
        };

        findBestDiscount(product.category);
        cartProduct.discount = selectedDiscount;
        cartProduct.priceAfterDiscount = min;
        cartProduct.savingViaCampaign = total - min;
        _this2.totalSavingViaCampaign += cartProduct.savingViaCampaign;
      });
    }
    /**
     * Applies coupon
     * @param {Coupon} coupon
     */

  }, {
    key: "applyCoupon",
    value: function applyCoupon(coupon) {
      var total = this.totalAfterDiscount || this.total;

      if (this.couponDiscount > 0) {
        throw new Error('Another coupon has applied.');
      }

      if (total >= coupon.delimiter) {
        this.coupon = coupon;
        this.couponDiscount = total - coupon.apply(total);
      } else {
        throw new Error('Coupon does not fits delimiter.');
      }
    }
  }]);

  return Cart;
}(_CartHelper2["default"]);

var _default = Cart;
exports["default"] = _default;