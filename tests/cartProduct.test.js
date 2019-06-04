import { Cart, Category, Product, CartProduct } from '../src/models'

const generator = () => {
  return {
    cart: new Cart(),
    apple: new Product('Apple', 100, new Category('Vegan')),
    banana: new Product('Banana', 100, new Category('Vegan'))
  }
}

test('Check CardProduct without product', () => {
  expect(() => {
    // eslint-disable-next-line
    new CartProduct()
  }).toThrowError(new Error('Product does not exists'))
})

test('Add single product to cart', () => {
  const { cart, apple } = generator()

  const cartProduct = new CartProduct(apple, 5.0)
  cart.addItem(apple, 5.0)

  expect(cart.products[0]).toEqual(cartProduct)
})

test('Add multiple product to cart with same category', () => {
  const {
    cart,
    banana,
    apple
  } = generator()
  cart.addItem(apple, 5.0)
  cart.addItem(banana, 5.0)

  expect(cart.products).toEqual([
    new CartProduct(apple, 5.0),
    new CartProduct(banana, 5.0)
  ])
})

test('Check false adding', () => {
  const {
    cart,
    apple
  } = generator()

  expect(() => {
    cart.addItem(apple, -5.0)
  }).toThrowError(new Error('-5 as a quantity, is not acceptable, quantity must be bigger than 0'))
})

test('Check false adding quantity', () => {
  const {
    cart,
    apple
  } = generator()

  expect(() => {
    cart.addItem(apple, 1.5)
  }).toThrowError(new Error('Quantity must be int.'))
})

test('Check false adding quantity', () => {
  const {
    cart,
    apple
  } = generator()

  expect(() => {
    cart.addItem(apple, 1)
    cart.addItem(apple, 1.5)
  }).toThrowError(new Error('Quantity must be int.'))
})

test('Check quantity calculation', () => {
  const {
    cart,
    apple
  } = generator()
  cart.addItem(apple, 1000)
  cart.addItem(apple, -999)
  expect(cart.products).toEqual([
    new CartProduct(apple, 1)
  ])
})

test('Check false adding -> removal', () => {
  const {
    cart,
    apple
  } = generator()

  expect(() => {
    cart.addItem(apple, 5.0)
    cart.addItem(apple, -5.0)
  }).toThrowError(new Error('Product removed from your cart.'))

  expect(() => {
    cart.addItem(apple, 5.0)
    cart.addItem(apple, -10.0)
  }).toThrowError(new Error('Quantity must be acceptable.'))
})

test('Removing non existance product from cart must work without hassle.', () => {
  const {
    cart,
    apple
  } = generator()
  cart.removeItem(apple, 5.0)
  expect(cart.products).toEqual([])
})
