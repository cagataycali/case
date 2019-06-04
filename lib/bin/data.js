"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockData = void 0;

var _ = require("../");

var mockData = {
  categories: [],
  cart: new _.Cart(),
  products: [],
  coupons: [],
  campaigns: [],
  deliveryCost: 0 // Seed categories

};
exports.mockData = mockData;
var fruit = new _.Category('Fruit');
var electronic = new _.Category('Electronic');
var tablet = new _.Category('Tablet', electronic, true);
var telephone = new _.Category('Telephone', electronic, true);
var ipad = new _.Category('iPad', tablet, true);
var iphone = new _.Category('iPhone', telephone, true);
mockData.categories = [fruit, electronic, tablet, telephone, ipad, iphone]; // Seed products

var apple = new _.Product('Apple', 10, fruit);
var productIpad64 = new _.Product('Apple 10.5" iPad Pro Wi-Fi 64GB', 3704, ipad);
var productIpad256 = new _.Product('Apple 10.5" iPad Pro Wi-Fi 256GB', 4899, ipad);
var productIphoneXSMax256 = new _.Product('Apple iPhone XS Max 256GB', 13443, iphone);
var productIphoneXSMax64 = new _.Product('Apple iPhone XS Max 512GB', 13985, iphone);
mockData.products = [apple, productIpad64, productIpad256, productIphoneXSMax64, productIphoneXSMax256]; // Seed campaign

var fruitCampaign = new _.Campaign(fruit, 30, 3, 'rate'); // 3 items or more for %30 discount

var electronicCampaign = new _.Campaign(electronic, 30, 3, 'rate'); // 3 items or more for %30 discount

var tabletCampaign = new _.Campaign(tablet, 20, 1, 'rate'); // All tablets are %20 discounted

var iphoneCampaign = new _.Campaign(iphone, 100, 5000, 'amount'); // In basket total bigger than 5000, get 100 TL discount.

mockData.campaigns = [fruitCampaign, electronicCampaign, tabletCampaign, iphoneCampaign]; // Seed coupon

var coupon1 = new _.Coupon(10000, 10, 'rate'); // Min item count 10, %10 discount

var coupon2 = new _.Coupon(10000, 500, 'amount'); // Min amount: 10000 TL, 500 TL discount

mockData.coupons = [coupon1, coupon2];