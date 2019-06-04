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
   * @param {Number} worth - The campaign worth, it can be represent amount or rate.
   * @param {Number} delimiter - The campaign delimiter works depends type.
   * @param {String} type - The type can be "amount" or "rate".
   */
  constructor (category = new Category('Undefined'), worth, delimiter, type) {
    this.category = category
    if (worth < 0) {
      throw new Error('Worth must be bigger than 0')
    }
    // If type is rate, worth > 100, must be 100.
    this.worth = type === 'rate' && worth > 100 ? 100 : worth
    if (type === 'amount' && worth > delimiter) {
      throw new Error('Worth can not be greater delimiter when campaign type is amount.')
    }
    this.delimiter = delimiter
    this.type = type
  }

  /**
   * @param {Number} price - The campaign seed worth, it can be represent amount or rate.
   * @return {Number} Returns calculated discount.
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
