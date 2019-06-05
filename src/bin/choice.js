import { Delivery } from '../'
import inquirer from 'inquirer'
import colors from 'colors'
import Table from 'cli-table'

export default class Choice {
  constructor (db) {
    this.db = db
  }

  // List products
  addItemToBasket (callback) {
    const products = this.db.products

    if (this.db.cart.isCouponUsed || this.db.cart.totalSavingViaCampaign > 0) {
      console.log(colors.bold.red('New additions is not allowed when coupon or campaign applied.'))
      return callback()
    }

    inquirer.prompt(
      [
        {
          type: 'list',
          name: 'choice',
          message: 'Which product you want?',
          choices: products.map(product => product.title)

        },
        {
          type: 'input',
          name: 'quantity',
          message: 'How many do you need?',
          validate: value => {
            var valid = !isNaN(parseInt(value)) && (value % 1 === 0) && value !== 0
            return valid || 'Quantity must be a number.'
          },
          filter: Number
        }
      ])
      .then(({ choice, quantity }) => {
        const product = products.find(_product => _product.title === choice)
        try {
          this.db.cart.addItem(product, quantity)
          console.log(colors.bold.green(`"${choice}" x ${quantity} added your basket\tTOTAL: ${this.db.cart.total}`))
        } catch ({ message }) {
          console.log(colors.bold.red(message))
        }
        console.log()
        callback()
      })
  }

  removeItemToBasket (callback) {
    const products = this.db.cart.products

    inquirer.prompt(
      [{
        type: 'list',
        name: 'choice',
        message: 'Which product you want to remove?',
        choices: products.map(product => product.title)
      }
      ]).then(({
      choice,
      quantity
    }) => {
      const cardProduct = products.find(_product => _product.title === choice)
      this.db.cart.removeItem(cardProduct.product)
      console.log(colors.bold.green(`"${choice}" removed your basket\tTOTAL: ${this.db.cart.total}`))
      console.log()
      callback()
    })
  }

  applyCampaign (callback) {
    if (this.db.cart.campaignUsed) {
      console.log(colors.bold.red(`Another campaign already used for this cart.`))
      return callback()
    }
    if (this.db.cart.couponDiscount > 0) {
      console.log(colors.bold.red(`Campaign can not applicable after using coupon.`))
      return callback()
    }
    const campaigns = this.db.campaigns

    inquirer.prompt(
      [{
        type: 'checkbox',
        name: 'categories',
        message: 'Which campaign you want to apply?',
        choices: campaigns.map(({
          category,
          type,
          delimiter,
          worth
        }) => ({
          value: category.title,
          key: category.title,
          name: type === 'amount' ? `${worth} TL discount for if basket total greater ${delimiter} TL` : `If you pick ${delimiter} item from ${category.title}, %${worth} discount`
        }))
      }
      ]).then(({ categories }) => {
      const _campaigns = categories.map(_category => {
        return campaigns.find(campaign => campaign.category.title === _category)
      })
      try {
        this.db.cart.applyDiscounts(..._campaigns)
        if (this.db.cart.campaignUsed) {
          console.log('Campaign applied'.rainbow)
          console.log(colors.bold.green(`Total saving via campaign: ${Math.round(this.db.cart.totalSavingViaCampaign)} TL`))
        } else {
          console.log(colors.bold.red('Campaign does not effects shopping cart.'))
        }
      } catch ({ message }) {
        console.log(colors.bold.red(message))
      }
      console.log()
      callback()
    })
  }

  applyCoupon (callback) {
    const coupons = this.db.coupons

    const generator = ({
      worth,
      delimiter,
      type
    }) => type === 'amount' ? `${worth} TL discount for if basket total greater ${delimiter} TL` : `%${worth} discount for if basket total greater ${delimiter} TL`

    inquirer.prompt(
      [{
        type: 'list',
        name: 'choice',
        message: 'Which coupon you want to apply?',
        choices: coupons.map(generator)
      }
      ]).then(({ choice }) => {
      const coupon = coupons.find(coupon => generator(coupon) === choice)
      try {
        this.db.cart.applyCoupon(coupon)
        if (this.db.cart.couponDiscount > 0) {
          console.log(`Coupon applied`.rainbow)
          console.log(colors.bold.green(`Total saving via coupon: ${Math.round(this.db.cart.couponDiscount)} TL`))
        }
      } catch ({ message }) {
        console.log(colors.bold.red(message))
      }
      console.log()
      callback()
    })
  }

  calculateDeliveryCost (callback) {
    if (this.db.cart.products.length === 0) {
      console.log(colors.bold.red('Please add items to cart first.'))
      return callback()
    }
    inquirer.prompt(
      [
        {
          type: 'input',
          name: 'costPerDelivery',
          message: 'Cost Per Delivery?',
          validate: value => {
            var valid = !isNaN(parseFloat(value)) && value >= 0
            return valid || 'Input must be a number.'
          },
          filter: Number
        },
        {
          type: 'input',
          name: 'costPerProduct',
          message: 'Cost Per Product?',
          validate: value => {
            var valid = !isNaN(parseFloat(value)) && value >= 0
            return valid || 'Input must be a number.'
          },
          filter: Number
        },
        {
          type: 'input',
          name: 'fixedCost',
          message: 'Fixed Cost?',
          default: 2.99,
          validate: value => {
            var valid = !isNaN(parseFloat(value)) && value >= 0
            return valid || 'Input must be a number.'
          },
          filter: Number
        }
      ]).then(({
      costPerDelivery,
      costPerProduct,
      fixedCost
    }) => {
      const deliveryCalculator = new Delivery(costPerDelivery, costPerProduct, fixedCost)
      this.db.deliveryCost = deliveryCalculator.calculateFor(this.db.cart)
      console.log(colors.bold.green(this.db.deliveryCost))
      console.log()
      callback()
    })
  }

  payment (callback) {
    if (this.db.deliveryCost === 0) {
      console.log(colors.bold.red('Please calculate delivery cost first.'))
      return callback()
    }
    console.log('|--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--|'.inverse)
    let categories = {}
    const products = this.db.cart.products

    products.map(cartProduct => {
      const product = cartProduct.product
      let category = categories[product.category.title]
      if (category) {
        categories[product.category.title].push(cartProduct)
      } else {
        categories[product.category.title] = [
          cartProduct
        ]
      }
    })
    Object.keys(categories).map(key => {
      const category = categories[key]
      console.log(colors.bold.yellow(key))

      const table = new Table({
        head: ['Product', 'Quantity', 'Unit Price', 'Total Price', 'Campaign Discount', 'Overall Amount']
      })

      category.map(cardProduct => {
        const savingViaCampaign = Math.round(cardProduct.savingViaCampaign) || 0
        const overallAmount = (cardProduct.total - savingViaCampaign) || 0
        table.push([cardProduct.title, cardProduct._quantity, cardProduct.product.price, cardProduct.total, savingViaCampaign, overallAmount || 0])
      })

      console.log(table.toString())
    })

    const table = new Table({
      head: ['Total', 'Delivery Cost', 'Overall (Total - (Campaign Discount + Coupon Discount) + Delivery Cost)']
    })

    table.push([this.db.cart.total, this.db.deliveryCost, Math.round(this.db.cart.totalAfterDiscount + this.db.deliveryCost) || 0])

    console.log(table.toString())
    console.log('|--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--|'.inverse)
    callback()
  }
}
