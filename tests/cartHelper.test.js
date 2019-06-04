import {
  Cart,
  Category,
  Product,
  CartProduct
} from '../src/models'

const generator = () => {
  return {
    cart: new Cart(),
    apple: new Product('Apple', 100, new Category('Vegan')),
    banana: new Product('Banana', 100, new Category('Vegan'))
  }
}

test('Initialize cart without products total must be 0', () => {
  expect(new Cart().total).toBe(0)
})

test('Distinct category count calculation', () => {
  const cart = new Cart()
  const vegan = new Category('Vegan')
  const iOS = new Category('iOS')

  const iPhone = new Product('iPhone XS Max', 8000, iOS)
  const apple = new Product('Apple', 100, vegan)

  cart.addItem(apple, 5)
  cart.addItem(iPhone, 5)
  expect(cart.distinctCategoryCount).toBe(2)
})

test('Add / remove multiple product', () => {
  const {
    cart,
    banana,
    apple
  } = generator()
  cart.addItem(apple, 5)
  cart.addItem(banana, 5)
  cart.addItem(banana, -3)

  cart.removeItem(apple)
  // Test via CartProduct
  cart.addItem(apple, 5)
  cart.removeItem(new CartProduct(apple, 5))

  expect(cart.products).toEqual([
    new CartProduct(banana, 2)
  ])
})

test('Add / minus multiple product to cart with same category, calculate total', () => {
  const {
    cart,
    banana,
    apple
  } = generator()
  cart.addItem(apple, 5)
  cart.addItem(apple, -2)
  cart.addItem(banana, 5)

  expect(cart.total).toBe(800)
})
