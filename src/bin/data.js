import {
  Cart,
  Category,
  Product,
  Campaign,
  Coupon
} from '../'

const mockData = {
  categories: [],
  cart: new Cart(),
  products: [],
  coupons: [],
  campaigns: [],
  deliveryCost: 0
}

// Seed categories
const fruit = new Category('Fruit')
const electronic = new Category('Electronic')
const tablet = new Category('Tablet', electronic, true)
const telephone = new Category('Telephone', electronic, true)
const ipad = new Category('iPad', tablet, true)
const iphone = new Category('iPhone', telephone, true)

mockData.categories = [
  fruit,
  electronic,
  tablet,
  telephone,
  ipad,
  iphone
]

// Seed products
const apple = new Product('Apple', 10, fruit)

const productIpad64 = new Product('Apple 10.5" iPad Pro Wi-Fi 64GB', 3704, ipad)
const productIpad256 = new Product('Apple 10.5" iPad Pro Wi-Fi 256GB', 4899, ipad)

const productIphoneXSMax256 = new Product('Apple iPhone XS Max 256GB', 13443, iphone)
const productIphoneXSMax64 = new Product('Apple iPhone XS Max 512GB', 13985, iphone)

mockData.products = [
  apple,
  productIpad64,
  productIpad256,
  productIphoneXSMax64,
  productIphoneXSMax256
]

// Seed campaign
const fruitCampaign = new Campaign(fruit, 30, 3, 'rate') // 3 items or more for %30 discount
const electronicCampaign = new Campaign(electronic, 30, 3, 'rate') // 3 items or more for %30 discount
const tabletCampaign = new Campaign(tablet, 20, 1, 'rate') // All tablets are %20 discounted
const iphoneCampaign = new Campaign(iphone, 100, 5000, 'amount') // In basket total bigger than 5000, get 100 TL discount.

mockData.campaigns = [
  fruitCampaign,
  electronicCampaign,
  tabletCampaign,
  iphoneCampaign
]

// Seed coupon
const coupon1 = new Coupon(10000, 10, 'rate') // Min item count 10, %10 discount
const coupon2 = new Coupon(10000, 500, 'amount') // Min amount: 10000 TL, 500 TL discount

mockData.coupons = [
  coupon1,
  coupon2
]

export { mockData }
