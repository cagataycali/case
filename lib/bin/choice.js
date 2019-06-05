"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("../");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _colors = _interopRequireDefault(require("colors"));

var _cliTable = _interopRequireDefault(require("cli-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Choice =
/*#__PURE__*/
function () {
  function Choice(db) {
    _classCallCheck(this, Choice);

    this.db = db;
  } // List products


  _createClass(Choice, [{
    key: "addItemToBasket",
    value: function addItemToBasket(callback) {
      var _this = this;

      var products = this.db.products;

      if (this.db.cart.isCouponUsed || this.db.cart.totalSavingViaCampaign > 0) {
        console.log(_colors["default"].bold.red('New additions is not allowed when coupon or campaign applied.'));
        return callback();
      }

      _inquirer["default"].prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which product you want?',
        choices: products.map(function (product) {
          return product.title;
        })
      }, {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function validate(value) {
          var valid = !isNaN(parseInt(value)) && value % 1 === 0 && value !== 0;
          return valid || 'Quantity must be a number.';
        },
        filter: Number
      }]).then(function (_ref) {
        var choice = _ref.choice,
            quantity = _ref.quantity;
        var product = products.find(function (_product) {
          return _product.title === choice;
        });

        try {
          _this.db.cart.addItem(product, quantity);

          console.log(_colors["default"].bold.green("\"".concat(choice, "\" x ").concat(quantity, " added your basket\tTOTAL: ").concat(_this.db.cart.total)));
        } catch (_ref2) {
          var message = _ref2.message;
          console.log(_colors["default"].bold.red(message));
        }

        console.log();
        callback();
      });
    }
  }, {
    key: "removeItemToBasket",
    value: function removeItemToBasket(callback) {
      var _this2 = this;

      var products = this.db.cart.products;

      _inquirer["default"].prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which product you want to remove?',
        choices: products.map(function (product) {
          return product.title;
        })
      }]).then(function (_ref3) {
        var choice = _ref3.choice,
            quantity = _ref3.quantity;
        var cardProduct = products.find(function (_product) {
          return _product.title === choice;
        });

        _this2.db.cart.removeItem(cardProduct.product);

        console.log(_colors["default"].bold.green("\"".concat(choice, "\" removed your basket\tTOTAL: ").concat(_this2.db.cart.total)));
        console.log();
        callback();
      });
    }
  }, {
    key: "applyCampaign",
    value: function applyCampaign(callback) {
      var _this3 = this;

      if (this.db.cart.campaignUsed) {
        console.log(_colors["default"].bold.red("Another campaign already used for this cart."));
        return callback();
      }

      if (this.db.cart.couponDiscount > 0) {
        console.log(_colors["default"].bold.red("Campaign can not applicable after using coupon."));
        return callback();
      }

      var campaigns = this.db.campaigns;

      _inquirer["default"].prompt([{
        type: 'checkbox',
        name: 'categories',
        message: 'Which campaign you want to apply?',
        choices: campaigns.map(function (_ref4) {
          var category = _ref4.category,
              type = _ref4.type,
              delimiter = _ref4.delimiter,
              worth = _ref4.worth;
          return {
            value: category.title,
            key: category.title,
            name: type === 'amount' ? "".concat(worth, " TL discount for if basket total greater ").concat(delimiter, " TL") : "If you pick ".concat(delimiter, " item from ").concat(category.title, ", %").concat(worth, " discount")
          };
        })
      }]).then(function (_ref5) {
        var categories = _ref5.categories;

        var _campaigns = categories.map(function (_category) {
          return campaigns.find(function (campaign) {
            return campaign.category.title === _category;
          });
        });

        try {
          var _this3$db$cart;

          (_this3$db$cart = _this3.db.cart).applyDiscounts.apply(_this3$db$cart, _toConsumableArray(_campaigns));

          if (_this3.db.cart.campaignUsed) {
            console.log('Campaign applied'.rainbow);
            console.log(_colors["default"].bold.green("Total saving via campaign: ".concat(Math.round(_this3.db.cart.totalSavingViaCampaign), " TL")));
          } else {
            console.log(_colors["default"].bold.red('Campaign does not effects shopping cart.'));
          }
        } catch (_ref6) {
          var message = _ref6.message;
          console.log(_colors["default"].bold.red(message));
        }

        console.log();
        callback();
      });
    }
  }, {
    key: "applyCoupon",
    value: function applyCoupon(callback) {
      var _this4 = this;

      var coupons = this.db.coupons;

      var generator = function generator(_ref7) {
        var worth = _ref7.worth,
            delimiter = _ref7.delimiter,
            type = _ref7.type;
        return type === 'amount' ? "".concat(worth, " TL discount for if basket total greater ").concat(delimiter, " TL") : "%".concat(worth, " discount for if basket total greater ").concat(delimiter, " TL");
      };

      _inquirer["default"].prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which coupon you want to apply?',
        choices: coupons.map(generator)
      }]).then(function (_ref8) {
        var choice = _ref8.choice;
        var coupon = coupons.find(function (coupon) {
          return generator(coupon) === choice;
        });

        try {
          _this4.db.cart.applyCoupon(coupon);

          if (_this4.db.cart.couponDiscount > 0) {
            console.log("Coupon applied".rainbow);
            console.log(_colors["default"].bold.green("Total saving via coupon: ".concat(Math.round(_this4.db.cart.couponDiscount), " TL")));
          }
        } catch (_ref9) {
          var message = _ref9.message;
          console.log(_colors["default"].bold.red(message));
        }

        console.log();
        callback();
      });
    }
  }, {
    key: "calculateDeliveryCost",
    value: function calculateDeliveryCost(callback) {
      var _this5 = this;

      if (this.db.cart.products.length === 0) {
        console.log(_colors["default"].bold.red('Please add items to cart first.'));
        return callback();
      }

      _inquirer["default"].prompt([{
        type: 'input',
        name: 'costPerDelivery',
        message: 'Cost Per Delivery?',
        validate: function validate(value) {
          var valid = !isNaN(parseFloat(value)) && value >= 0;
          return valid || 'Input must be a number.';
        },
        filter: Number
      }, {
        type: 'input',
        name: 'costPerProduct',
        message: 'Cost Per Product?',
        validate: function validate(value) {
          var valid = !isNaN(parseFloat(value)) && value >= 0;
          return valid || 'Input must be a number.';
        },
        filter: Number
      }, {
        type: 'input',
        name: 'fixedCost',
        message: 'Fixed Cost?',
        "default": 2.99,
        validate: function validate(value) {
          var valid = !isNaN(parseFloat(value)) && value >= 0;
          return valid || 'Input must be a number.';
        },
        filter: Number
      }]).then(function (_ref10) {
        var costPerDelivery = _ref10.costPerDelivery,
            costPerProduct = _ref10.costPerProduct,
            fixedCost = _ref10.fixedCost;
        var deliveryCalculator = new _.Delivery(costPerDelivery, costPerProduct, fixedCost);
        _this5.db.deliveryCost = deliveryCalculator.calculateFor(_this5.db.cart);
        console.log(_colors["default"].bold.green(_this5.db.deliveryCost));
        console.log();
        callback();
      });
    }
  }, {
    key: "payment",
    value: function payment(callback) {
      if (this.db.deliveryCost === 0) {
        console.log(_colors["default"].bold.red('Please calculate delivery cost first.'));
        return callback();
      }

      console.log('|--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--|'.inverse);
      var categories = {};
      var products = this.db.cart.products;
      products.map(function (cartProduct) {
        var product = cartProduct.product;
        var category = categories[product.category.title];

        if (category) {
          categories[product.category.title].push(cartProduct);
        } else {
          categories[product.category.title] = [cartProduct];
        }
      });
      Object.keys(categories).map(function (key) {
        var category = categories[key];
        console.log(_colors["default"].bold.yellow(key));
        var table = new _cliTable["default"]({
          head: ['Product', 'Quantity', 'Unit Price', 'Total Price', 'Campaign Discount', 'Overall Amount']
        });
        category.map(function (cardProduct) {
          var savingViaCampaign = Math.round(cardProduct.savingViaCampaign) || 0;
          var overallAmount = cardProduct.total - savingViaCampaign || 0;
          table.push([cardProduct.title, cardProduct._quantity, cardProduct.product.price, cardProduct.total, savingViaCampaign, overallAmount || 0]);
        });
        console.log(table.toString());
      });
      var table = new _cliTable["default"]({
        head: ['Total', 'Delivery Cost', 'Overall (Total - (Campaign Discount + Coupon Discount) + Delivery Cost)']
      });
      table.push([this.db.cart.total, this.db.deliveryCost, Math.round(this.db.cart.totalAfterDiscount + this.db.deliveryCost) || 0]);
      console.log(table.toString());
      console.log('|--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--||--|--|'.inverse);
      callback();
    }
  }]);

  return Choice;
}();

exports["default"] = Choice;