import helpers from '../src/helpers'

describe('Helpers suite', () => {
  it('Rate case', () => {
    expect(helpers.discount.rate(200, 0)).toBe(200)
    expect(helpers.discount.rate(200, 10)).toBe(180)
    expect(helpers.discount.rate(200, 100)).toBe(0)
    expect(helpers.discount.rate(200, 500)).toBe(0)
    expect(helpers.discount.rate(200, -500)).toBe(0)
  })
  it('Amount case', () => {
    expect(helpers.discount.amount(200, 0)).toBe(200)
    expect(helpers.discount.amount(200, 10)).toBe(190)
    expect(helpers.discount.amount(200, -300)).toBe(0)
    expect(helpers.discount.amount(200, -5)).toBe(195)
  })
})
