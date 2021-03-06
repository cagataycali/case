"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing a Cart Helper.
 */
var CartHelper =
/*#__PURE__*/
function () {
  /**
   * Create a Cart Helper.
   * @param {Array.<Product>} products - The products.
   * @param {Array.<Campaign>} discounts - The discounts.
   * @param {Coupon} coupon - Applied coupon.
   * @param {Number} couponDiscount - Coupon's discount of cart total.
   */
  function CartHelper(products) {
    _classCallCheck(this, CartHelper);

    this.products = products;
    this.discounts = null;
    this.coupon = null;
    this.couponDiscount = 0;
  }
  /**
   * Total getter calculates total price reactively.
   * @memberof CartHelper
   * @public
   * @member {Number} total
   */


  _createClass(CartHelper, [{
    key: "total",
    get: function get() {
      var total = 0;
      this.products.map(function (cartProduct) {
        return total += cartProduct.total;
      });
      return total;
    }
    /**
     * The getter calculates total amount after discount price reactively.
     * @memberof CartHelper
     * @public
     * @member {Number} totalAfterDiscount
     */

  }, {
    key: "totalAfterDiscount",
    get: function get() {
      var total = 0;
      this.products.map(function (cartProduct) {
        return total += cartProduct.priceAfterDiscount;
      });
      return total;
    }
  }, {
    key: "overallTotal",
    get: function get() {
      return this.totalAfterDiscount - this.couponDiscount;
    }
    /**
     * The getter calculates how many distinct category exists reactively.
     */

  }, {
    key: "distinctCategoryCount",
    get: function get() {
      var categories = new Map();
      this.products.map(function (_ref) {
        var product = _ref.product;
        var category = product.category;
        categories.set(category.title, categories.get(category.title) + 1 || 1);
      });
      return categories.size;
    }
  }]);

  return CartHelper;
}();

var _default = CartHelper;
exports["default"] = _default;