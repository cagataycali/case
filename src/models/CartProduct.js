import Product from './Product'

/**
 * Class representing a product which inside Cart via supplements.
 * @extends Product
 */
class CartProduct extends Product {
  /**
   * Create a Cart Product.
   * @param {Product} product - The product.
   * @param {number} quantity - The quantity of product.
   */
  constructor (product, quantity = 1) {
    if (!product) {
      throw new Error('Product does not exists')
    }
    super(product.title, product.price, product.category.title)
    if (quantity % 1) {
      throw new Error('Quantity must be int.')
    }
    if (quantity < 0) {
      const error = `${quantity} as a quantity, is not acceptable, quantity must be bigger than 0`
      throw new Error(error)
    }

    this._quantity = quantity
    this.total = (product.price * quantity)
    this.product = product
  }

  /**
   * Setter of quantity, manipulates private "_quantity" variable.
   * Calculate total price by then.
   * @param {number} quantity - The quantity of product.
   */
  set quantity (quantity) {
    if (quantity % 1) {
      throw new Error('Quantity must be int.')
    }

    this._quantity = quantity
    this.total = (this.price * this._quantity)
    if (this.total <= 0) {
      throw new Error('Quantity must be acceptable.')
    }
  }

  /**
   * Getter of private "_quantity" variable.
   */
  get quantity () {
    return this._quantity
  }
}

export default CartProduct
