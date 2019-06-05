import { Cart, Product, Category, Delivery } from '../src/models'

test('Cart must be binded', () =>
  expect(() => new Delivery().calculateFor()).toThrowError(new Error('Delivery cost calculator needs to apply a cart.')))

test('Delivery integration', () => {
  const cart = new Cart()
  // Create iOS category bind electronic as a parent.
  const iOS = new Category('iOS', new Category('Electronic'), true)
  const iPhone = new Product('iPhone XS Max', 8000, iOS)

  // Add to basket 2 iPhone: 8000 * 2 = 16000
  cart.addItem(iPhone, 2)

  const costPerDelivery = 1
  const costPerProduct = 1
  const fixedCost = 2.99
  const deliveryCalculator = new Delivery(costPerDelivery, costPerProduct, fixedCost)

  expect(deliveryCalculator.calculateFor(cart)).toBe(4.99)
})
