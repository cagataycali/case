import {
  Category,
  Product
} from '../src/models'

test('Root category does not have parent', () => {
  const electronic = new Category('Electronic')

  expect(electronic.parent).toEqual(null)
})

test('Nested category bind', () => {
  const electronic = new Category('Electronic')

  const telephone = new Category('Telephone', electronic, true)

  expect(telephone.parent).toEqual(electronic)
})

test('Create new category, bind a product', () => {
  const vegan = new Category('Vegan')
  const apple = new Product('Apple', 100, vegan)

  expect(apple.category).toEqual(vegan)
})
