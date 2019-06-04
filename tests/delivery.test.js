import { Cart, Product, Category, Delivery } from '../src/models'

const generator = () => {
  return {
    cart: new Cart(),
    apple: new Product('Apple', 100, new Category('Vegan')),
    banana: new Product('Banana', 100, new Category('Vegan')),
    category: {
      electronic: new Category('Electronic')
    }
  }
}

test('Delivery unit', () => {
  expect(() => {
    // eslint-disable-next-line
    new Delivery().calculateFor()
  }).toThrowError(new Error('Delivery cost calculator needs to apply a cart.'))
})

test('Delivery integration', () => {
  const {
    cart,
    category
  } = generator()
  // Create iOS category bind electronic as a parent.
  const iOS = new Category('iOS', category.electronic, true)
  const iPhone = new Product('iPhone XS Max', 8000, iOS)

  // Add to basket 2 iPhone: 8000 * 2 = 16000
  cart.addItem(iPhone, 2)

  const costPerDelivery = 1
  const costPerProduct = 1
  const fixedCost = 2.99
  const deliveryCalculator = new Delivery(costPerDelivery, costPerProduct, fixedCost)

  expect(deliveryCalculator.calculateFor(cart)).toBe(4.99)
})
