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
const rate = (price, rate) =>
  Math.max(0, price - (price * Math.abs(rate) / 100))

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
const amount = (price, amount) =>
  Math.max(price - (Math.abs(amount) > price ? price : Math.abs(amount)), 0)

/**
 * Check input is acceptable string.
 * [^a-z^A-Z]+ // Matchs any non word chars numerics excluded also.
 * @param {?String} input
 */
const isAcceptableString = input =>
  Object.prototype.toString.call(input) === '[object String]' &&
    input.replace(new RegExp('[^a-z^A-Z]+'), '').length > 0

/**
 * Check input is number.
 * @param {Number} input
 */
const isNumber = input =>
  Object.prototype.toString.call(input) === '[object Number]' && !isNaN(input)

/**
 * Check input is number and greater than zero.
 * @param {Number} input
 */
const isGreaterThanZero = input =>
  isNumber(input) && input > 0

/** Discount helper methods composer. */
const helpers = {
  discount: {
    rate,
    amount
  },
  isAcceptableString,
  isNumber,
  isGreaterThanZero
}

export default helpers
