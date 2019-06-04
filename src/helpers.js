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
const rate = (price, rate) => Math.max(0, price - (price * Math.abs(rate) / 100))

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
const amount = (price, amount) => Math.max(price - (Math.abs(amount) > price ? price : Math.abs(amount)), 0)

/** Discount helper methods composer. */
const helpers = {
  discount: {
    /** Rate calculator */
    rate,
    amount
  }
}

export default helpers
