var Table = require('cli-table')

// instantiate
var table = new Table({
  head: ['Category', 'Product', 'Quantity', 'Unit Price', 'Total Price', 'Total Discount (Campaign - Coupon)']
})

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
  ['Telephone', 'Apple iPhone XS Max 256GB', 1, 13443, 13443, '(0-0)'],
  ['Telephone', 'Apple iPhone XS Max 256GB', 1, 13443, 13443, '(0-0)'],
  ['Telephone', 'Apple iPhone XS Max 256GB', 1, 13443, 13443, '(0-0)']
)

console.log(table.toString())
