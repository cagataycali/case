import { Campaign, Category } from '../src'

test('Campaign can not be generated without category', () => {
  expect(new Campaign(undefined, 'Crash', 1).category).toEqual(new Category('Undefined'))
})
