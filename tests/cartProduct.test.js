import { Cart, Category, Product, CartProduct } from '../src/models'

describe('Cart product suite', () => {
  describe('when constructed', () => {
    it('without product', () => {
      expect(() => new CartProduct(undefined)).toThrowError(new Error('Product must be binded.'))
    })
    it('with wrong class', () => {
      expect(() => new CartProduct(new Category('Wrong way'))).toThrowError(new Error('Product must be binded.'))
    })
    describe('quantity is', () => {
      const product = new Product('Test Product', 1, new Category('Test Category'))
      it('floating number', () => {
        expect(() => new CartProduct(product, 1.5)).toThrowError(new Error('Quantity must be int.'))
      })
      it('negative number', () => {
        expect(() => new CartProduct(product, -1)).toThrowError(new Error('-1 as a quantity, is not acceptable, quantity must be bigger than 0'))
      })
    })
    describe('must be', () => {
      it('total calculated', () => {
        const product = new Product('Test Product', 1, new Category('Test Category'))
        expect(new CartProduct(product, 2).total).toBe(2)
      })
      it('price after discount setted total', () => {
        const product = new Product('Test Product', 1, new Category('Test Category'))
        expect(new CartProduct(product, 2).priceAfterDiscount).toBe(2)
      })
    })
  })
  describe('when in usage', () => {
    describe('when change quantity direct', () => {
      const product = new Product('Test Product', 1, new Category('Test Category'))
      const cartProduct = new CartProduct(product, 2)
      it('+', () => {
        expect(() => {
          cartProduct.quantity = 1.1
        }).toThrowError(new Error('Quantity must be int.'))
      })
      it('- but not acceptable', () => {
        expect(() => {
          cartProduct.quantity = -2
        }).toThrowError(new Error('Quantity must be acceptable.'))
      })
    })
    describe('when change quantity indirect', () => {
      it('+', () => {
        const cart = new Cart()
        const product = new Product('Test Product', 1, new Category('Test Category'))
        cart.addItem(product, 2)
        cart.addItem(product, 2)
        expect(cart.products[0].quantity).toBe(4)
      })
      it('-', () => {
        const cart = new Cart()
        const product = new Product('Test Product', 1, new Category('Test Category'))
        cart.addItem(product, 2)
        cart.addItem(product, -1)
        expect(cart.products[0].quantity).toBe(1)
      })
      it('- till remove', () => {
        const cart = new Cart()
        const product = new Product('Test Product', 1, new Category('Test Category'))
        cart.addItem(product, 2)
        expect(() => {
          cart.addItem(product, -2)
        }).toThrowError(new Error('Product removed from your cart.'))
      })
    })
  })
})
