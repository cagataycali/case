import CartHelper from './CartHelper'
import CartProduct from './CartProduct'

/**
 * Class representing a shopping cart.
 * @extends CartHelper
 */
class Cart extends CartHelper {
  /**
   * Create Cart.
   * @param {Array.<Product>} products - Creates empty products, bind parent helper.
   */
  constructor (products = []) {
    super(products)
    this.totalSavingViaCampaign = 0
    this.couponDiscount = 0
    this.campaignUsed = false
  }

  /**
   * Adds products into shopping cart if does not exists,
   * If exists, calculate quantity, total and etc.
   * @param {Product} product
   * @param {number} quantity
   */
  addItem (product, quantity) {
    const cartProduct = this.products.find(cartProduct => cartProduct.product === product)

    if (!cartProduct) {
      this.products.push(new CartProduct(product, quantity))
    } else {
      cartProduct.quantity += quantity
    }
  }

  /**
   * Find related product in cart products,
   * Remove and calculate total like properties.
   * @param {Product} product
   */
  removeItem (product) {
    if (product instanceof CartProduct) {
      product = product.product
    }
    this.products = this.products.filter(({
      product: _product
    }) => _product !== product)
  }

  /**
   * Simply, applies discounts,
   * Flatten the categories via counting sort, check delimits of discount.
   * If can find the best discount on product, apply and calculate total amount.
   * @param  {...Campaign} discounts
   */
  applyDiscounts (...discounts) {
    this.discounts = discounts
    if (this.campaignUsed) {
      throw new Error('Campaign used before')
    }

    if (this.couponDiscount > 0) {
      throw new Error('Campaign can not applicable after using coupon.')
    }

    /*
      Flatten categories via counting sort.
      For delimiting campaigns.
    */
    const categories = new Map()
    this.products.map(cartProduct => {
      const { _quantity, product } = cartProduct
      function findParent (category) {
        categories.set(category.title,
          ((categories.get(category.title) + 1) || _quantity)
        )
        if (category.leaf) {
          findParent(category.parent)
        }
      }
      findParent(product.category)
    })

    this.products.map(cartProduct => {
      const product = cartProduct.product
      let total = cartProduct.total
      let min = cartProduct.total
      let selectedDiscount

      /*
        findBestDiscount: inline function, is a recursion till find category parent.
        It tries to find the most appropriate campaign by checking the campaign limits.
      */
      const findBestDiscount = category => {
        // Find spesified category discount
        const discount = this.discounts.find(discount => discount.category.title === category.title)
        // Should I apply campaign to the product? -optimistic
        let apply = true
        if (discount && (discount.apply(total) < min)) {
          // Apply discount only delimiter fits the campaign
          apply = (discount.type === 'rate' ? categories.get(category.title) : total) >= discount.delimiter
          // Gotcha!
          if (apply) {
            min = discount.apply(total)
            selectedDiscount = discount
            this.campaignUsed = true
          }
        }
        // I'm awaiting your parents to school tomorrow.
        if (category.leaf) {
          findBestDiscount(category.parent)
        }
      }

      findBestDiscount(product.category)

      cartProduct.discount = selectedDiscount
      cartProduct.priceAfterDiscount = min
      cartProduct.savingViaCampaign = total - min
      this.totalSavingViaCampaign += cartProduct.savingViaCampaign
    })
  }

  /**
   * Applies coupon
   * @param {Coupon} coupon
   */
  applyCoupon (coupon) {
    const total = this.totalAfterDiscount || this.total

    if (this.couponDiscount > 0) {
      throw new Error('Another coupon has applied.')
    }
    if (total >= coupon.delimiter) {
      this.coupon = coupon
      this.couponDiscount = total - coupon.apply(total)
    } else {
      throw new Error('Coupon does not fits delimiter.')
    }
  }
}

export default Cart
