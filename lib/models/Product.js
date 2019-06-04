"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("../");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Product.
 * @example
 * // A product which belongs to electronic category.
 * new Product(new Category('Electronic'), 'iPhone', 1000)
 */
var Product =
/**
 * Create a Product.
 * @param {Category} category - The category which product belongs to.
 * @param {String} title - Product title.
 * @param {Number} price - The products unit price.
 */
function Product(title, price) {
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _.Category('Undefined');

  _classCallCheck(this, Product);

  this.title = title;
  this.price = Math.abs(price);
  this.category = category;
};

var _default = Product;
exports["default"] = _default;