"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Category.
 * @example
 * // Root category:
 * const electronic = new Category('Electronic')
 * // Inner category:
 * const telephone = new Category('Telephone', electronic)
 * // Inner - Leaf category:
 * const iOS = new Category('iOS', telephone)
 */
var Category =
/**
 * Create a category.
 * @param {Category} parent - The category which the category belongs to.
 * @param {String} title - Category title.
 * @param {Boolean} leaf - Category is leaf or not?
 */
function Category(title) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, Category);

  if (!_helpers["default"].isAcceptableString(title)) {
    throw new Error('Title is not in acceptable form.');
  } // TODO: check if parent exists, instanceof Category. Add tests to category.test.js


  this.title = title;
  this.parent = parent;
  this.leaf = !!parent;
};

var _default = Category;
exports["default"] = _default;