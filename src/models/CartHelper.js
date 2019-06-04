/**
 * Class representing a Cart Helper.
 */
class CartHelper {
  /**
   * Create a Cart Helper.
   * @param {Array.<Product>} products - The products.
   * @param {Array.<Campaign>} discounts - The discounts.
   * @param {Coupon} coupon - Applied coupon.
   * @param {Number} couponDiscount - Coupon's discount of cart total.
   */
  constructor (products) {
    this.products = products
    this.discounts = null
    this.coupon = null
    this.couponDiscount = 0
  }

  /**
   * Total getter calculates total price reactively.
   * @memberof CartHelper
   * @public
   * @member {Number} total
   */
  get total () {
    let total = 0
    this.products.map(cartProduct => (total += cartProduct.total))
    return total
  }

  /**
   * The getter calculates total amount after discount price reactively.
   * @memberof CartHelper
   * @public
   * @member {Number} totalAfterDiscount
   */
  get totalAfterDiscount () {
    let total = 0
    this.products.map(cartProduct => (total += cartProduct.priceAfterDiscount))
    return total
  }

  /**
   * The getter calculates how many distinct category exists reactively.
   */
  get distinctCategoryCount () {
    const categories = new Map()
    this.products.map(({ product }) => {
      const category = product.category
      categories.set(category.title, (categories.get(category.title) + 1 || 1))
    })
    return categories.size
  }

  /**
   * Public method getCampaignDiscounts takes target discont, returns discounted product.
   * @param {Campaign} discount
   * @return Returns discount applied product.
   */
  getCampaignDiscounts (discount) {
    return this.products.find(product => product.discount === discount)
  }
}

export default CartHelper
