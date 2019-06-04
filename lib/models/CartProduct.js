"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Product2 = _interopRequireDefault(require("./Product"));

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
 * Class representing a product which inside Cart via supplements.
 * @extends Product
 */
var CartProduct =
/*#__PURE__*/
function (_Product) {
  _inherits(CartProduct, _Product);

  /**
   * Create a Cart Product.
   * @param {Product} product - The product.
   * @param {Number} quantity - The quantity of product.
   */
  function CartProduct(product) {
    var _this;

    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, CartProduct);

    if (!product) {
      throw new Error('Product does not exists');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CartProduct).call(this, product.title, product.price, product.category.title));

    if (quantity % 1) {
      throw new Error('Quantity must be int.');
    }

    if (quantity < 0) {
      var error = "".concat(quantity, " as a quantity, is not acceptable, quantity must be bigger than 0");
      throw new Error(error);
    }

    _this._quantity = quantity;
    _this.total = product.price * quantity;
    _this.product = product;
    return _this;
  }
  /**
   * Setter of quantity, manipulates private "_quantity" variable.
   * Calculate total price by then.
   * @param {Number} quantity - The quantity of product.
   */


  _createClass(CartProduct, [{
    key: "quantity",
    set: function set(quantity) {
      if (quantity % 1) {
        throw new Error('Quantity must be int.');
      }

      this._quantity = quantity;
      this.total = this.price * this._quantity;

      if (this.total <= 0) {
        throw new Error('Quantity must be acceptable.');
      }
    }
    /**
     * Getter of private "_quantity" variable.
     */
    ,
    get: function get() {
      return this._quantity;
    }
  }]);

  return CartProduct;
}(_Product2["default"]);

var _default = CartProduct;
exports["default"] = _default;