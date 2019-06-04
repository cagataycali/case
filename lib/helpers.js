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
 * @param {number} price - Input price.
 * @param {number} rate - Ratio.
 * @returns {number} Method apply discount given price by rate.
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
 * @param {number} price - Input price.
 * @param {number} rate - Ratio.
 * @returns {number} Method apply discount given price by amount.
 */


var amount = function amount(price, _amount) {
  return Math.max(price - (Math.abs(_amount) > price ? price : Math.abs(_amount)), 0);
};
/** Discount helper methods composer. */


var helpers = {
  discount: {
    /** Rate calculator */
    rate: rate,
    amount: amount
  }
};
var _default = helpers;
exports["default"] = _default;