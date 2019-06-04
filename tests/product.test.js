import { Product, Category } from '../src'

test('Product can not be generated without category', () => {
  expect(new Product('Crash', 1).category).toEqual(new Category('Undefined'))
})

test('Product price can not lower than 0 or equal', () => {
  expect(new Product('Crash', 0).price).toBe(0)
  expect(new Product('Crash', -1).price).toBe(1)
})
