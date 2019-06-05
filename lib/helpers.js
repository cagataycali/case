"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Rate calculator.
 * @example
 * helpers.discount.rate(200, 0) // returns 200
 * helpers.discount.rate(200, 10) // returns 180
 * helpers.discount.rate(200, 100) // returns 0
 * helpers.discount.rate(200, 500) // returns 0
 * @param {Number} price - Input price.
 * @param {Number} rate - Ratio.
 * @returns {Number} Method apply discount given price by rate.
 */
var rate = function rate(price, _rate) {
  return Math.max(0, price - price * Math.abs(_rate) / 100);
};
/**
 * Amount calculator.
 * @example
 *
 * helpers.discount.amount(200, 10) // returns 190
 * helpers.discount.amount(200, 300) // returns 0
 * helpers.discount.amount(200, -300) // returns 0
 * helpers.discount.amount(200, -5) // returns 195
 * @param {Number} price - Input price.
 * @param {Number} rate - Ratio.
 * @returns {Number} Method apply discount given price by amount.
 */


var amount = function amount(price, _amount) {
  return Math.max(price - (Math.abs(_amount) > price ? price : Math.abs(_amount)), 0);
};
/**
 * Check input is acceptable string.
 * [^a-z^A-Z]+ // Matchs any non word chars numerics excluded also.
 * @param {?String} input
 */


var isAcceptableString = function isAcceptableString(input) {
  return Object.prototype.toString.call(input) === '[object String]' && input.replace(new RegExp('[^a-z^A-Z]+'), '').length > 0;
};
/**
 * Check input is number.
 * @param {?Number} input
 */


var isNumber = function isNumber(input) {
  return Object.prototype.toString.call(input) === '[object Number]' && !isNaN(input);
};
/**
 * Check input is number and greater than zero.
 * @param {?Number} input
 */


var isGreaterThanZero = function isGreaterThanZero(input) {
  return isNumber(input) && input > 0;
};
/** Discount helper methods composer. */


var helpers = {
  discount: {
    rate: rate,
    amount: amount
  },
  isAcceptableString: isAcceptableString,
  isNumber: isNumber,
  isGreaterThanZero: isGreaterThanZero
};
var _default = helpers;
exports["default"] = _default;