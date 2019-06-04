#!/usr/bin/env node
"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

var _colors = _interopRequireDefault(require("colors"));

var _choice = _interopRequireDefault(require("./choice"));

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clear = require('clear');

var determinator = new _choice["default"](_data.mockData); // https://stackoverflow.com/a/2970667

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces

    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

console.log(_colors["default"].bold.green('OLD SCHOOL SHOPPING START'));

var start = function start() {
  _inquirer["default"].prompt([{
    type: 'list',
    name: 'choice',
    message: 'What can I do for you?',
    choices: ['Add item to basket', 'Remove item to basket', 'Apply campaign', 'Apply coupon', 'Calculate Delivery Cost', 'Payment', 'Quit'],
    filter: function filter(val) {
      return camelize(val);
    }
  }]).then(function (_ref) {
    var choice = _ref.choice;

    switch (choice) {
      case 'addItemToBasket':
        clear();
        determinator.addItemToBasket(start);
        break;

      case 'removeItemToBasket':
        clear();
        determinator.removeItemToBasket(start);
        break;

      case 'applyCampaign':
        clear();
        determinator.applyCampaign(start);
        break;

      case 'applyCoupon':
        clear();
        determinator.applyCoupon(start);
        break;

      case 'calculateDeliveryCost':
        clear();
        determinator.calculateDeliveryCost(start);
        break;

      case 'payment':
        clear();
        determinator.payment(start);
        break;

      default:
        console.log(_colors["default"].bold.green('OLD SCHOOL SHOPPING ENDS'));
        break;
    }
  });
};

start();