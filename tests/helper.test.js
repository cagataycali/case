import helpers from '../src/helpers'

describe('Helpers suite', () => {
  describe('Rate units', () => {
    it('%0 - 200 TL = 200 TL', () => expect(helpers.discount.rate(200, 0)).toBe(200))
    it('%10 - 200 TL = 180 TL', () => expect(helpers.discount.rate(200, 10)).toBe(180))
    it('%100 - 200 TL = 0 TL', () => expect(helpers.discount.rate(200, 100)).toBe(0))
    it('%500 - 200 TL = 0 TL', () => expect(helpers.discount.rate(200, 500)).toBe(0))
    it('%-500 - 200 TL = 0 TL', () => expect(helpers.discount.rate(200, -500)).toBe(0))
  })
  describe('Amount units', () => {
    it('200 - 0 TL = 200 TL', () => expect(helpers.discount.amount(200, 0)).toBe(200))
    it('200 - 10 TL = 190 TL', () => expect(helpers.discount.amount(200, 10)).toBe(190))
    it('200 - 100 TL = 100 TL', () => expect(helpers.discount.amount(200, 100)).toBe(100))
    it('200 - 500  TL = 0 TL', () => expect(helpers.discount.amount(200, 500)).toBe(0))
    it('200 - -500  TL = 0 TL', () => expect(helpers.discount.amount(200, -500)).toBe(0))
  })
  describe('String units', () => {
    it('undefined', () => expect(helpers.isAcceptableString(undefined)).toEqual(false))
    it('0', () => expect(helpers.isAcceptableString('0')).toEqual(false))
    it('     ', () => expect(helpers.isAcceptableString('       ')).toEqual(false))
    it('!!!!!', () => expect(helpers.isAcceptableString('!!!!!')).toEqual(false))
  })
  describe('Number units', () => {
    it('NaN :)', () => expect(helpers.isNumber(NaN)).toBe(false)) // Not A Number Is: A Number AcTuaLLY! But I do not interested with miths.. :)
    it('-5', () => expect(helpers.isGreaterThanZero(-5)).toBe(false))
    it('10 :)', () => expect(helpers.isNumber(10)).toBe(true))
  })
})
