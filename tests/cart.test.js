import {
  Cart,
  Category,
  Product,
  Campaign,
  Coupon
} from '../src/models'

const _cart = () => new Cart()

test('Empty cart creation works w/o hassle', () => expect(new Cart() instanceof Cart).toEqual(true))

describe('Cart integration suite', () => {
  /**
   * Let's generate our mock data for integration suite.
   */

  // CATEGORIES START
  const electronic = new Category('Electronic')
  const telephone = new Category('Telephone', electronic)
  const tablet = new Category('Tablet', electronic)

  const ios = new Category('iOS', telephone)
  // CATEGORIES END

  // PRODUCTS START
  const iPhone7 = new Product('iPhone 7', 4000, ios)
  const iPhoneXS = new Product('iPhone XS', 9000, ios)

  const GalaxyTab = new Product('Galaxy Tab', 3000, tablet)
  // PRODUCTS END

  // CAMPAIGNS START
  // %10 discount when 3 electronic device or more.
  const electronicCampaign = new Campaign(electronic, 10, 3, 'rate')

  // %20 discount when 2 telephone or more.
  const telephoneCampaign = new Campaign(telephone, 20, 2, 'rate')

  // %20 discount when 1 tablet or more.
  const tabletCampaign = new Campaign(tablet, 20, 1, 'rate')
  // CAMPAIGNS END

  // COUPONS START
  // 100 TL discount if cart total greater than 3000 TL
  const coupon0 = new Coupon(3000, 100, 'amount')

  // 500 TL discount if cart total greater than 10000 TL
  const coupon1 = new Coupon(10000, 500, 'amount')

  // %10 discount if cart total greater than 3000 TL
  const coupon2 = new Coupon(3000, 10, 'rate')
  // COUPONS END

  describe('adding product to cart for', () => {
    describe('flattens categories via counting sort it has', () => {
      const cart = _cart()
      cart.addItem(iPhone7, 1)
      cart.addItem(iPhoneXS, 1)

      it('size 3', () => expect(cart.flattenCategories().size).toEqual(3))
      it('iOS category', () => expect((cart.flattenCategories()).has('iOS')).toEqual(true))
      it('Telephone category', () => expect((cart.flattenCategories()).has('Telephone')).toEqual(true))
      it('Electronic category', () => expect((cart.flattenCategories()).has('Electronic')).toEqual(true))
    })
  })
  describe('when applying campaign as discount', () => {
    describe('apply single campaign (campaign binded root category, product belongs to children category)', () => {
      describe('which no effect', () => {
        const cart = _cart()
        cart.addItem(iPhone7, 1)
        cart.applyDiscounts(electronicCampaign)
        it('total saving must be 0', () => expect(cart.totalSavingViaCampaign).toBe(0))
        it('campaignUsed must be false', () => expect(cart.campaignUsed).toEqual(false))
      })
      describe('which works like charm', () => {
        const cart = _cart()
        cart.addItem(iPhone7, 3) // Fits delimiter of campaign / campaign delimiter is 3.
        cart.applyDiscounts(electronicCampaign) // Must pick campaign, 4000 * 3 = 12000 % 10 = 1200 TL.
        it('total saving must be 0', () => expect(cart.totalSavingViaCampaign).toBe(1200))
        it('campaignUsed must be false', () => expect(cart.campaignUsed).toEqual(true))
      })
      describe('can not apply one more time', () => {
        const cart = _cart()
        cart.addItem(iPhone7, 3) // Fits delimiter of campaign / campaign delimiter is 3.
        cart.applyDiscounts(electronicCampaign) // Must pick campaign, 4000 * 3 = 12000 % 10 = 1200 TL.
        expect(() => cart.applyDiscounts(electronicCampaign)).toThrowError(new Error('Campaign used before'))
      })
    })
    describe('apply multiple campaign', () => {
      describe('with 2 different rate which', () => {
        describe('no effect cause', () => {
          describe('delimiter not fits, category fits.', () => {
            const cart = _cart()
            cart.addItem(iPhone7, 1)
            cart.applyDiscounts(electronicCampaign, telephoneCampaign)
            it('total saving must be 0', () => expect(cart.totalSavingViaCampaign).toBe(0))
            it('campaignUsed must be false', () => expect(cart.campaignUsed).toEqual(false))
          })
          describe('delimiter not fits, category not fits.', () => {
            const cart = _cart()
            cart.addItem(iPhone7, 1)
            cart.applyDiscounts(tabletCampaign, telephoneCampaign)
            it('total saving must be 0', () => expect(cart.totalSavingViaCampaign).toBe(0))
            it('campaignUsed must be false', () => expect(cart.campaignUsed).toEqual(false))
          })
        })
        describe('works like charm, picks best campaign ', () => {
          describe('with single product', () => {
            const cart = _cart()
            cart.addItem(iPhone7, 3) // Fits delimiter of campaign / campaign delimiter is 3.
            cart.applyDiscounts(electronicCampaign, telephoneCampaign) // Must pick best campaign, 4000 * 3 = 12000 % 20 = 2400 TL.
            it('total saving must be 2400', () => expect(cart.totalSavingViaCampaign).toBe(2400))
            it('campaignUsed must be true', () => expect(cart.campaignUsed).toEqual(true))
          })
          describe('with multiple product - same category', () => {
            const cart = _cart()
            cart.addItem(iPhone7, 2) // Fits delimiter of campaign / campaign delimiter is 3.
            cart.addItem(iPhoneXS, 1) // Fits delimiter of campaign / campaign delimiter is 3.
            cart.applyDiscounts(electronicCampaign, telephoneCampaign) // Must pick best campaign, 4000 * 2 = (8000 + 9000) % 20 = 3400 TL.
            it('total saving must be 2400', () => expect(cart.totalSavingViaCampaign).toBe(3400))
            it('campaignUsed must be true', () => expect(cart.campaignUsed).toEqual(true))
          })
          describe('* [EDGE CASE ALERT] * with multiple product - one of different category - must pick another campaign for them', () => {
            const cart = _cart()
            cart.addItem(iPhone7, 2) // Fits delimiter of campaign / campaign delimiter is 3.
            cart.addItem(GalaxyTab, 1) // Fits delimiter of campaign / campaign delimiter is 3.
            cart.applyDiscounts(electronicCampaign, telephoneCampaign) // Must pick best campaign, (3000 % 10) + (8000 % 20) 300 + 1600  = 1900 TL.
            it('total saving must be 1900', () => expect(cart.totalSavingViaCampaign).toBe(1900))
            it('campaignUsed must be true', () => expect(cart.campaignUsed).toEqual(true))
          })
        })
      })
    })
  })
  describe('when applying coupon as a discount', () => {
    it('apply campaign after coupon used: //throws error', () => {
      const cart = _cart()
      cart.addItem(iPhone7, 1)
      cart.applyCoupon(coupon0)
      expect(() => cart.applyDiscounts(electronicCampaign)).toThrowError('Campaign can not applicable after using coupon.')
    })
    it('does not fit delimiter', () => {
      const cart = _cart()
      cart.addItem(iPhone7, 1) // 4000 TL
      expect(() => cart.applyCoupon(coupon1)).toThrowError(new Error('Coupon does not fits delimiter.'))
    })
    it('works like charm', () => {
      const cart = _cart()
      cart.addItem(iPhone7, 3) // 4000 * 3 = 12000 TL
      cart.applyCoupon(coupon1) // Coupon delimiter is 10000 TL, 500 TL discount.
      expect(cart.couponUsed).toEqual(true)
      expect(cart.couponDiscount).toEqual(500)
    })
  })
  describe('* [EDGE CASE ALERT] * Campaign + coupon usage with 2 different sub category', () => {
    const cart = _cart()
    cart.addItem(iPhone7, 2) // 8000 TL % 20 = 1600.
    cart.addItem(GalaxyTab, 1) // 3000 TL % 30 = 900.
    // 8000 + 3000 = 12000 - (1900) = 10100 % 10 = 910.
    cart.applyDiscounts(electronicCampaign, telephoneCampaign) // Must pick best campaign, (3000 % 10) + (8000 % 20) 300 + 1600  = 1900 TL.
    cart.applyCoupon(coupon2) // Coupon delimiter is 3000 TL, %10 discount.
    it('total saving via campaign must be 1900', () => expect(cart.totalSavingViaCampaign).toBe(1900))
    it('campaignUsed must be true', () => expect(cart.campaignUsed).toEqual(true))
    it('couponUsed must be true', () => expect(cart.couponUsed).toEqual(true))
    it('coupon discount must be 910', () => expect(cart.couponDiscount).toBe(910))
    it('Overall Total 8190', () => expect(cart.overallTotal).toBe(8190)) // :)
    it('another coupon can not be appliable', () => expect(() => cart.applyCoupon(coupon2)).toThrowError(new Error('Another coupon has applied.')))
    it('cart class can be return which products applied spesific campain', () => {
      // If one item has been applied is object otherwise array.
      expect(cart.getCampaignDiscounts(electronicCampaign).title).toEqual('Galaxy Tab')
    })
  })
})
