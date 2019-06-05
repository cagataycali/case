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
   * @param {Number} delimiter - The coupon delimiter works depends type.
   * @param {Number} worth - The coupon worth, it can be represent amount or rate.
   * @param {String} type - The type can be "amount" or "rate".
   */
  constructor (delimiter, worth, type) {
    if (worth < 0 || delimiter < 0) {
      throw new Error('Delimiter and worth must be bigger than 0.')
    }
    // If type is rate, worth > 100, must be 100.
    if (worth > 100 && type === 'rate') {
      worth = 100
    }
    this.worth = worth
    this.delimiter = delimiter
    this.worth = worth
    this.type = type
  }

  /**
   * @param {Number} price - The coupon seed worth, it can be represent amount or rate.
   * @return {Number} Returns calculated discount.
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
