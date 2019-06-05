import {
  Category,
  Product
} from '../src/models'

describe('Category suite', () => {
  describe('when title is', () => {
    it('undefined', () => expect(() =>
      new Category(undefined))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('0', () => expect(() =>
      new Category(0))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('numeric but has string constructor.', () => expect(() =>
      new Category('0'))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('non word chars', () => expect(() =>
      new Category('!!!'))
      .toThrowError(new Error('Title is not in acceptable form.')))
    it('multiple spaces', () => expect(() =>
      new Category('       '))
      .toThrowError(new Error('Title is not in acceptable form.')))
  })
  describe('when does not have parent', () => {
    it('parent must be null', () => expect(new Category('Electronic').parent).toEqual(null))
    it('leaf must be false', () => expect(new Category('Electronic').leaf).toEqual(false))
  })
  describe('when have parent', () => {
    it('parent must be instanceof category', () =>
      expect(new Category('Telephone', new Category('Electronic'), true) instanceof Category).toEqual(true))
    it('parent title must be match', () =>
      expect(new Category('Telephone', new Category('Electronic'), true).parent.title).toEqual('Electronic'))
    it('category is leaf', () =>
      expect(new Category('Telephone', new Category('Electronic'), true).leaf).toEqual(true))
  })
  describe('when binded a product', () => {
    it('keep single category instance', () =>
      expect(new Product('Apple', 100, new Category('Vegan')).category instanceof Category).toEqual(true))
    it('keep nested category instance', () =>
      expect(new Product('Apple', 100, new Category('Vegan', new Category('Food'), true)).category.parent instanceof Category).toEqual(true))
  })
})
