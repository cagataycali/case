import { Coupon } from '../src/models'

describe('Coupon suite', () => {
  describe('constructor', () => {
    it('delimiter is negative', () => expect(() => new Coupon(-1, 1, 'rate')).toThrowError(new Error('Delimiter and worth must be bigger than 0.')))
    it('worth is negative', () => expect(() => new Coupon(1, -1, 'rate')).toThrowError(new Error('Delimiter and worth must be bigger than 0.')))
    it('worth is %110 when type is rate', () => expect(new Coupon(1, 110, 'rate').worth).toBe(100))
  })
  describe('proper coupon', () => {
    // 100 TL delimiter, %10 discount
    const coupon1 = new Coupon(100, 10, 'rate')
    // 100 TL delimiter, 10 TL discount
    const coupon2 = new Coupon(100, 10, 'amount')
    it('Coupon must be acceptable by rate', () => {
      // Min amount: 100, %10 discount, must be rejected
      expect(() => coupon1.apply(90)).toThrowError(new Error('Price "90" must be bigger than delimiter amount "100" for use this coupon.'))
      expect(coupon1.apply(200)).toBe(180)
    })

    it('Coupon must be acceptable by amount', () => {
      expect(coupon2.apply(100)).toBe(90)
      expect(coupon2.apply(200)).toBe(190)
    })
  })
})
