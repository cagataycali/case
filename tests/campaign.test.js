import { Campaign, Category } from '../src'

const campaign = (worth, type, delimiter = 1) => new Campaign(new Category('Electronic'), worth, delimiter, type)

test('Campaign can not be generated without category', () => {
  expect(new Campaign(undefined, 'Crash', 1).category).toEqual(new Category('Undefined'))
})

describe('Campaign suite', () => {
  describe('Rate suite', () => {
    it('%10 over 1000 = 900', () => expect(campaign(10, 'rate').apply(1000)).toBe(900))
    it('%10 over 0 = 0', () => expect(campaign(10, 'rate').apply(0)).toBe(0))
    it('%10 over -9999 = 0', () => expect(campaign(10, 'rate').apply(0)).toBe(0))
    it('%0 over 1000 = 1000', () => expect(campaign(0, 'rate').apply(1000)).toBe(1000))
    it('%120 over 1000 = 0', () => expect(campaign(120, 'rate').apply(1000)).toBe(0))
    it('%0 over 0 = 0', () => expect(campaign(0, 'rate').apply(0)).toBe(0))
    it('%-10 over 1000 // throws error', () => expect(() => campaign(-10, 'rate'))
      .toThrowError(new Error('Delimiter and worth must be bigger than 0.')))
  })
  describe('Amount suite', () => {
    it('100 TL discount, 100: 0', () =>
      expect(campaign(100, 'amount').apply(100)).toBe(0))
    it('5 TL discount, 50: 45', () =>
      expect(campaign(5, 'amount').apply(50)).toBe(45))
    it('200 TL discount, 0: 0', () =>
      expect(campaign(200, 'amount').apply(0)).toBe(0))
    it('200 TL discount, -100: //throw error', () =>
      expect(() => campaign(200, 'amount').apply(-100))
        .toThrowError(new Error('Price "-100" must be bigger than 0.')))
    it('-5 TL discount, 100: //throw error', () =>
      expect(() => campaign(-5, 'amount').apply(50)).toThrowError(new Error('Delimiter and worth must be bigger than 0.')))
  })
})
