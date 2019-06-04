"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing a Delivery Calculator.
 */
var Delivery =
/*#__PURE__*/
function () {
  /**
   * Create a Delivery Calculator.
   * @param {number} costPerDelivery
   * @param {number} costPerProduct
   * @param {number} fixedCost
   */
  function Delivery() {
    var costPerDelivery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var costPerProduct = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var fixedCost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2.99;

    _classCallCheck(this, Delivery);

    this.costPerDelivery = costPerDelivery;
    this.costPerProduct = costPerProduct;
    this.fixedCost = fixedCost;
  }
  /**
   * Delivery calculator calculates dynamically delivery costs by cart properties.
   * @param {Cart} cart
   */


  _createClass(Delivery, [{
    key: "calculateFor",
    value: function calculateFor(cart) {
      if (!cart) {
        throw new Error('Delivery cost calculator needs to apply a cart.');
      }

      return this.costPerDelivery * cart.distinctCategoryCount + this.costPerProduct * cart.products.length + this.fixedCost;
    }
  }]);

  return Delivery;
}();

var _default = Delivery;
exports["default"] = _default;