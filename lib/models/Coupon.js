"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing a coupon, exists for applying discount on shopping cart items.
 * @example
 * // %10 discount if shopping cart if cart total amount bigger than delimiter
 * new Coupon(
 *  10, // worth
 *  1000, // delimiter
 *  'rate' // type
 * )
 */
var Coupon =
/*#__PURE__*/
function () {
  /**
   * Create a Campaign.
   * @param {Number} delimiter - The coupon delimiter works depends type.
   * @param {Number} worth - The coupon worth, it can be represent amount or rate.
   * @param {String} type - The type can be "amount" or "rate".
   */
  function Coupon(delimiter, worth, type) {
    _classCallCheck(this, Coupon);

    this.delimiter = delimiter;
    this.worth = worth;
    this.type = type;
  }
  /**
   * @param {Number} price - The coupon seed worth, it can be represent amount or rate.
   * @return {Number} Returns calculated discount.
  */


  _createClass(Coupon, [{
    key: "apply",
    value: function apply(price) {
      if (price < this.delimiter) {
        var error = "Price \"".concat(price, "\" must be bigger than delimiter amount \"").concat(this.delimiter, "\" for use this coupon.");
        throw new Error(error);
      }

      return _helpers["default"].discount[this.type](price, this.worth);
    }
  }]);

  return Coupon;
}();

var _default = Coupon;
exports["default"] = _default;