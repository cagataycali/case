"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Product.
 * @example
 * // A product which belongs to electronic category.
 * new Product('iPhone', 1000, new Category('Electronic'))
 */
var Product =
/**
 * Create a Product.
  * @param {String} title - Product title.
 * @param {Number} price - The products unit price.
 * @param {Category} category - The category which product belongs to.
 */
function Product(title, price, category) {
  _classCallCheck(this, Product);

  this.title = title;
  this.price = price;
  this.category = category;

  if (!_helpers["default"].isAcceptableString(title)) {
    throw new Error('Title is not in acceptable form.');
  }

  if (!_helpers["default"].isGreaterThanZero(price)) {
    throw new Error('Price is not in acceptable form.');
  }

  if (!(category instanceof _.Category)) {
    throw new Error('Category must be initialized properly.');
  }
};

var _default = Product;
exports["default"] = _default;