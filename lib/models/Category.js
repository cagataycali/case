"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Category.
 * @example
 * // Root category:
 * const electronic = new Category('Electronic')
 * // Inner category:
 * const telephone = new Category('Telephone', electronic, true)
 * // Inner - Leaf category:
 * const iOS = new Category('iOS', telephone, true)
 */
var Category =
/**
 * Create a category.
 * @param {Category} parent - The category which the category belongs to.
 * @param {string} title - Category title.
 * @param {boolean} leaf - Category is leaf or not?
 */
function Category(title) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var leaf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _classCallCheck(this, Category);

  this.title = title;
  this.parent = parent;
  this.leaf = leaf;
};

var _default = Category;
exports["default"] = _default;