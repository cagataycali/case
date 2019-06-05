import helpers from '../helpers'
import { Category } from '../'
/**
 * Class representing a Product.
 * @example
 * // A product which belongs to electronic category.
 * new Product('iPhone', 1000, new Category('Electronic'))
 */
class Product {
  /**
   * Create a Product.

   * @param {String} title - Product title.
   * @param {Number} price - The products unit price.
   * @param {Category} category - The category which product belongs to.
   */
  constructor (title, price, category) {
    this.title = title
    this.price = price
    this.category = category
    if (!helpers.isAcceptableString(title)) {
      throw new Error('Title is not in acceptable form.')
    }
    if (!helpers.isGreaterThanZero(price)) {
      throw new Error('Price is not in acceptable form.')
    }
    if (!(category instanceof Category)) {
      throw new Error('Category must be initialized properly.')
    }
  }
}

export default Product
