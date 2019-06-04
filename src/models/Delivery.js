/**
 * Class representing a Delivery Calculator.
 */
class Delivery {
  /**
   * Create a Delivery Calculator.
   * @param {number} costPerDelivery
   * @param {number} costPerProduct
   * @param {number} fixedCost
   */
  constructor (costPerDelivery = 0, costPerProduct = 0, fixedCost = 2.99) {
    this.costPerDelivery = costPerDelivery
    this.costPerProduct = costPerProduct
    this.fixedCost = fixedCost
  }

  /**
   * Delivery calculator calculates dynamically delivery costs by cart properties.
   * @param {Cart} cart
   */
  calculateFor (cart) {
    if (!cart) {
      throw new Error('Delivery cost calculator needs to apply a cart.')
    }
    return (
      (this.costPerDelivery * cart.distinctCategoryCount) +
        (this.costPerProduct * cart.products.length) +
            this.fixedCost
    )
  }
}

export default Delivery
