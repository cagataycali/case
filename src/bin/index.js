#!/usr/bin/env node
import inquirer from 'inquirer'
import colors from 'colors'
import Choice from './choice'
import { mockData } from './data'
const clear = require('clear')

let determinator = new Choice(mockData)

// https://stackoverflow.com/a/2970667
function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

console.log(colors.bold.green('OLD SCHOOL SHOPPING START'))

const start = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'What can I do for you?',
    choices: ['Add item to basket', 'Remove item to basket', 'Apply campaign', 'Apply coupon', 'Calculate Delivery Cost', 'Payment', 'Quit'],
    filter: val => camelize(val)
  }]).then(({
    choice
  }) => {
    switch (choice) {
      case 'addItemToBasket':
        clear()
        determinator.addItemToBasket(start)
        break

      case 'removeItemToBasket':
        clear()
        determinator.removeItemToBasket(start)
        break

      case 'applyCampaign':
        clear()
        determinator.applyCampaign(start)
        break

      case 'applyCoupon':
        clear()
        determinator.applyCoupon(start)
        break

      case 'calculateDeliveryCost':
        clear()
        determinator.calculateDeliveryCost(start)
        break

      case 'payment':
        clear()
        determinator.payment(start)
        break

      default:
        console.log(colors.bold.green('OLD SCHOOL SHOPPING ENDS'))
        break
    }
  })
}

start()
