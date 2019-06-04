import {
  Cart,
  Category,
  Product,
  Campaign,
  Coupon
} from '../src/models'

const generator = () => {
  return {
    cart: new Cart(),
    apple: new Product('Apple', 100, new Category('Vegan')),
    banana: new Product('Banana', 100, new Category('Vegan')),

    category: {
      electronic: new Category('Electronic')
    },
    campaign: {
      electronic: new Campaign(new Category('Electronic'), 10, 1, 'rate')
    }
  }
}

const { category } = generator()
const iOS = new Category('iOS', category.electronic, true)
const iPhone = new Product('iPhone XS Max', 8000, iOS)

test('Initialize cart without products', () => {
  expect(new Cart()).toEqual({
    'coupon': null,
    'couponDiscount': 0,
    'discounts': null,
    'products': [],
    'totalSavingViaCampaign': 0,
    'campaignUsed': false
  })
})

describe('Cart integration tests', () => {
  it('Apply single campaign to parent category of items in basket', () => {
    const { cart, campaign } = generator()

    cart.addItem(iPhone, 2)

    // Saving must be 1600
    cart.applyDiscounts(campaign.electronic)

    expect(cart.totalSavingViaCampaign).toEqual(1600)
  })

  it('Add multiple item into basket, apply discount for them', () => {
    const { cart, campaign, apple, banana } = generator()

    const iPhone7 = new Product('iPhone 7', 3500, iOS)

    // Add to basket 2 iPhone: 8000 * 2 = 16000
    cart.addItem(iPhone, 2)
    cart.addItem(iPhone7, 2)

    cart.addItem(apple, 2)
    cart.addItem(banana, 2)

    // Saving must be 1600
    cart.applyDiscounts(campaign.electronic)

    expect(cart.totalSavingViaCampaign).toEqual(2300)
  })

  it('Multiple campaign binded, cart must pick best campaign', () => {
    const { cart, campaign } = generator()

    cart.addItem(iPhone, 2)

    // The boss gonna crazy, iOS devices has been %50 discounted for limited time.
    const iOSCampaign = new Campaign(iOS, 50, 1, 'rate')

    // Saving must be 8000, algorithm must be pick %50
    cart.applyDiscounts(campaign.electronic, iOSCampaign)

    expect(cart.totalSavingViaCampaign).toEqual(8000)
  })

  it('Apply discount twice must be throw error', () => {
    const { cart, campaign } = generator()

    cart.addItem(iPhone, 2)

    // The boss gonna crazy, iOS devices has been %50 discounted for limited time.
    const iOSCampaign = new Campaign(iOS, 50, 1, 'rate')

    // Saving must be 8000, algorithm must be pick %50
    cart.applyDiscounts(campaign.electronic, iOSCampaign)

    expect(cart.totalAfterDiscount).toEqual(8000)

    expect(() => {
      cart.applyDiscounts(campaign.electronic, iOSCampaign)
    }).toThrowError(new Error('Campaign used before'))
  })

  it('Pick best campaign', () => {
    const { cart, apple } = generator()
    // If cart total amount is bigger than 20 TL, discount 5 TL. It equal = %50 discount.
    const campaign1 = new Campaign(new Category('Vegan'), 100, 200, 'amount')
    // If card have 2 vegan item, discount %20
    const campaign2 = new Campaign(new Category('Vegan'), 20, 2, 'rate')

    // Apple: 100 * 2 = 200 TL
    cart.addItem(apple, 2)

    // Algorithm must be select campaign1.
    cart.applyDiscounts(campaign1, campaign2)

    expect(cart.totalSavingViaCampaign).toEqual(100)
    expect(cart.getCampaignDiscounts(campaign1)).toEqual(cart.products[0])
  })

  it('Coupon usage twice, campaign after using coupon', () => {
    const { cart, category } = generator()

    const iPhone = new Product('iPhone XS Max', 8000, category.electronic)

    cart.addItem(iPhone, 1)

    // Over 7000 TL, %10 discount from boss.
    const coupon = new Coupon(7000, 10, 'rate')

    // Saving via coupon is %10: 8800
    cart.applyCoupon(coupon)

    // Calculated coupon discount must be 800,
    expect(cart.couponDiscount).toEqual(800)

    expect(() => {
      cart.applyCoupon(coupon)
    }).toThrowError(new Error('Another coupon has applied.'))

    expect(() => {
      const iOSCampaign = new Campaign(category.electronic, 50, 1, 'rate')
      cart.applyDiscounts(iOSCampaign)
    }).toThrowError(new Error('Campaign can not applicable after using coupon.'))
  })

  it('Non acceptable coupon test', () => {
    const { cart, category } = generator()

    const iPhone = new Product('iPhone XS Max', 8000, category.electronic)

    cart.addItem(iPhone, 1)

    const coupon = new Coupon(8000.9, 10, 'rate')

    expect(() => {
      cart.applyCoupon(coupon)
    }).toThrowError(new Error('Coupon does not fits delimiter.'))
  })

  it('Check delimited campaign by rate', () => {
    const { cart, campaign } = generator()
    // Add to basket 2 iPhone: 8000 * 2 = 16000
    cart.addItem(iPhone, 2)

    /*
      The boss gonna crazy, iOS devices has been %50 discounted for limited time.
      If you buy 3 iPhone!
     */
    const iOSCampaign = new Campaign(iOS, 50, 3, 'rate')

    /*
      Saving must'nt be 8000,
      Algorithm must pick %10 discounted campaign.
      That's the changing game, saving is 1600
    */
    cart.applyDiscounts(campaign.electronic, iOSCampaign)

    expect(cart.totalSavingViaCampaign).toEqual(1600)
  })

  it('Check delimited campaign by amount', () => {
    const { cart, category } = generator()
    // Add to basket 2 iPhone: 8000 * 2 = 16000
    cart.addItem(iPhone, 2)

    /*
      The boss gonna crazy, Electronic devices has been discounted 1000 TL,
      If your cart total >= 20000
     */
    const insaneCampaign = new Campaign(category.electronic, 1000, 20000, 'amount')

    /*
      Next time friend, your cart total is 16000,
      That's the reason u can not pick insane campaign.
    */
    expect(() => {
      cart.applyDiscounts(insaneCampaign)
    }).toThrowError(new Error('Price "16000" must be bigger than delimiter amount "20000" for use this campaign.'))
  })
})
