"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _rateLimiter = require("./rate-limiter");
Object.keys(_rateLimiter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rateLimiter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rateLimiter[key];
    }
  });
});