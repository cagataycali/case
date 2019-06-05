import {
  Cart,
  Category,
  Product
} from '../src/models'

describe('Cart helper suite', () => {
  describe('when add a proper product into cart', () => {
    const cart = new Cart()
    const category = new Category('Test Category')
    const product = new Product('Test Product', 10, category)
    cart.addItem(product, 2)
    it('must calculate total: 2*10 = 20', () => expect(cart.total).toBe(20))
    it('must calculate totalAfterDiscount: 20', () => expect(cart.totalAfterDiscount).toBe(20))
  })
  describe('when add multiple proper product into cart (with different categories)', () => {
    const cart = new Cart()
    const product = new Product('Test Product', 10, new Category('Test Category'))
    const product2 = new Product('Test Product2', 10, new Category('Test Category2'))
    cart.addItem(product, 2)
    cart.addItem(product2, 2)
    it('must distinct category count', () => expect(cart.distinctCategoryCount).toBe(2))
  })
})
