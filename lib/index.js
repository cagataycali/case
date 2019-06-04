"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require("./models");

Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _models[key];
    }
  });
});