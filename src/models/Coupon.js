import helpers from '../helpers'

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
class Coupon {
  /**
   * Create a Campaign.
   * @param {number} delimiter - The coupon delimiter works depends type.
   * @param {number} worth - The coupon worth, it can be represent amount or rate.
   * @param {string} type - The type can be "amount" or "rate".
   */
  constructor (delimiter, worth, type) {
    this.delimiter = delimiter
    this.worth = worth
    this.type = type
  }

  /**
   * @param {number} price - The coupon seed worth, it can be represent amount or rate.
   * @return {number} Returns calculated discount.
  */
  apply (price) {
    if (price < this.delimiter) {
      const error = `Price "${price}" must be bigger than delimiter amount "${this.delimiter}" for use this coupon.`
      throw new Error(error)
    }
    return helpers.discount[this.type](price, this.worth)
  }
}

export default Coupon
