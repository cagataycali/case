import { Product, Category } from '../src'

const mockCategory = new Category('Test')

describe('Product suite', () => {
  describe('when title is', () => {
    it('undefined', () =>
      expect(() => new Product(undefined, 1, mockCategory)).toThrowError(new Error('Title is not in acceptable form.')))
    it('0', () => expect(() =>
      new Product(0, 1, mockCategory))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('numeric but has string constructor.', () => expect(() =>
      new Product('0', 1, mockCategory))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('non word chars', () => expect(() =>
      new Product('!!!', 1, mockCategory))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('multiple spaces', () => expect(() =>
      new Product('       ', 0, mockCategory))
      .toThrowError(new Error('Title is not in acceptable form.')))
  })
  describe('when price', () => {
    it('is 0', () => expect(() => new Product('Test Product', 0, mockCategory)).toThrowError(new Error('Price is not in acceptable form.')))
    it('is "0"', () => expect(() => new Product('Test Product', '0', mockCategory)).toThrowError(new Error('Price is not in acceptable form.')))
  })
  describe('when category is', () => {
    it('not valid', () => expect(() => new Product('Test', 1, 'Test')).toThrowError(new Error('Category must be initialized properly.')))
    it('valid', () => expect(new Product('Test', 1, new Category('Test')).category instanceof Category).toEqual(true))
  })
})
