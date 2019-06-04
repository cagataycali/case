"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing a Campaign, exists for applying discount by category on shopping cart items.
 * @example
 * // %10 discount if shopping cart has 1 electronic device.
 * new Campaign(
 *  new Category('Electronic'), // category
 *  10, // worth
 *  1, // delimiter
 *  'rate' // type
 * )
 */
var Campaign =
/*#__PURE__*/
function () {
  /**
   * Create a Campaign.
   * @param {Category} category - The category which campaign belongs to.
   * @param {Number} worth - The campaign worth, it can be represent amount or rate.
   * @param {Number} delimiter - The campaign delimiter works depends type.
   * @param {String} type - The type can be "amount" or "rate".
   */
  function Campaign() {
    var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _.Category('Undefined');
    var worth = arguments.length > 1 ? arguments[1] : undefined;
    var delimiter = arguments.length > 2 ? arguments[2] : undefined;
    var type = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, Campaign);

    this.category = category;

    if (worth < 0) {
      throw new Error('Worth must be bigger than 0');
    } // If type is rate, worth > 100, must be 100.


    this.worth = type === 'rate' && worth > 100 ? 100 : worth;

    if (type === 'amount' && worth > delimiter) {
      throw new Error('Worth can not be greater delimiter when campaign type is amount.');
    }

    this.delimiter = delimiter;
    this.type = type;
  }
  /**
   * @param {Number} price - The campaign seed worth, it can be represent amount or rate.
   * @return {Number} Returns calculated discount.
   */


  _createClass(Campaign, [{
    key: "apply",
    value: function apply(price) {
      if (this.type === 'amount' && price < this.delimiter) {
        var error = "Price \"".concat(price, "\" must be bigger than delimiter amount \"").concat(this.delimiter, "\" for use this campaign.");
        throw new Error(error);
      }

      return _helpers["default"].discount[this.type](price, this.worth);
    }
  }]);

  return Campaign;
}();

var _default = Campaign;
exports["default"] = _default;