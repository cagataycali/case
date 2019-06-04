import { Coupon } from '../src/models'

describe('Coupon suite', () => {
  it('Coupon must be acceptable by rate', () => {
    // Min amount: 100, %10 discount, must be rejected
    const coupon = new Coupon(100, 10, 'rate')

    expect(() => {
      coupon.apply(90)
    }).toThrowError(new Error('Price "90" must be bigger than delimiter amount "100" for use this coupon.'))

    expect(coupon.apply(100)).toBe(90)
  })

  it('Coupon must be acceptable by amount', () => {
    // Min amount: 100, 20 TL discount, must be rejected
    const coupon = new Coupon(100, 30, 'amount')

    expect(() => {
      coupon.apply(90)
    }).toThrowError(new Error('Price "90" must be bigger than delimiter amount "100" for use this coupon.'))

    expect(coupon.apply(200)).toBe(170)
  })
})
