import { Category } from '../'
/**
 * Class representing a Product.
 * @example
 * // A product which belongs to electronic category.
 * new Product(new Category('Electronic'), 'iPhone', 1000)
 */
class Product {
  /**
   * Create a Product.
   * @param {Category} category - The category which product belongs to.
   * @param {String} title - Product title.
   * @param {Number} price - The products unit price.
   */
  constructor (title, price, category = new Category('Undefined')) {
    this.title = title
    this.price = Math.abs(price)
    this.category = category
  }
}

export default Product
