import helpers from '../helpers'
import { Category } from '../'

/**
 * Class representing a Campaign, exists for applying discount by category on shopping cart items.
 * @example
 * // %10 discount if shopping cart has 1 electronic device.
 * new Campaign(
 *  new Category('Electronic'), // category
 *  10, // worth
 *  1, // delimiter
 *  'rate' // type
 * )
 */
class Campaign {
  /**
   * Create a Campaign.
   * @param {Category} category - The category which campaign belongs to.
   * @param {number} worth - The campaign worth, it can be represent amount or rate.
   * @param {number} delimiter - The campaign delimiter works depends type.
   * @param {string} type - The type can be "amount" or "rate".
   */
  constructor (category = new Category('Undefined'), worth, delimiter, type) {
    this.category = category
    this.worth = worth
    this.delimiter = delimiter
    this.type = type
  }

  /**
   * @param {number} price - The campaign seed worth, it can be represent amount or rate.
   * @return {number} Returns calculated discount.
   */
  apply (price) {
    if (this.type === 'amount' && price < this.delimiter) {
      const error = `Price "${price}" must be bigger than delimiter amount "${this.delimiter}" for use this campaign.`
      throw new Error(error)
    }
    return helpers.discount[this.type](price, this.worth)
  }
}

export default Campaign
