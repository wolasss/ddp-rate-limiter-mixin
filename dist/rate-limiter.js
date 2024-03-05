"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateLimiterMixin = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global DDPRateLimiter, Meteor */
/* eslint import/prefer-default-export: 0 */
var isOptionalStringOrFunction = function isOptionalStringOrFunction(val) {
  return typeof val === 'string' || typeof val === 'function' || typeof val === 'undefined';
};
var isOptionalObject = function isOptionalObject(val) {
  return _typeof(val) === 'object' || typeof val === 'undefined';
};
var isOptionalFunction = function isOptionalFunction(val) {
  return typeof val === 'function' || typeof val === 'undefined';
};
var alwaysTrue = function alwaysTrue() {
  return true;
};
var RateLimiterMixin = exports.RateLimiterMixin = function RateLimiterMixin(methodOptions) {
  if (Meteor.isClient) {
    return methodOptions;
  }
  var name = methodOptions.name,
    rateLimit = methodOptions.rateLimit;
  if (!rateLimit) {
    throw new Error("RateLimiterMixin: rateLimit option is missing (".concat(name, " method)"));
  }
  var matcher = rateLimit.matcher,
    numRequests = rateLimit.numRequests,
    timeInterval = rateLimit.timeInterval,
    callback = rateLimit.callback;
  if (typeof numRequests !== 'number') {
    throw new Error("RateLimiterMixin: numRequests must be a number (".concat(name, " method)"));
  }
  if (typeof timeInterval !== 'number') {
    throw new Error("RateLimiterMixin: timeInterval must be a number (".concat(name, " method)"));
  }
  if (!isOptionalObject(matcher)) {
    throw new Error("RateLimiterMixin: matcher must be an object if specified (".concat(name, " method)"));
  }
  if (!isOptionalFunction(callback)) {
    throw new Error("RateLimiterMixin: callback must be a function if specified (".concat(name, " method)"));
  }
  var _ref = matcher || {},
    _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? alwaysTrue : _ref$userId,
    _ref$connectionId = _ref.connectionId,
    connectionId = _ref$connectionId === void 0 ? alwaysTrue : _ref$connectionId,
    _ref$clientAddress = _ref.clientAddress,
    clientAddress = _ref$clientAddress === void 0 ? alwaysTrue : _ref$clientAddress;
  if (!isOptionalStringOrFunction(userId)) {
    throw new Error("RateLimiterMixin: matcher.userId must be a string or a function if specified (".concat(name, " method)"));
  }
  if (!isOptionalStringOrFunction(connectionId)) {
    throw new Error("RateLimiterMixin: matcher.connectionId must be a string or a function if specified (".concat(name, " method)"));
  }
  if (!isOptionalStringOrFunction(clientAddress)) {
    throw new Error("RateLimiterMixin: matcher.clientAddress must be a string or a function if specified (".concat(name, " method)"));
  }
  DDPRateLimiter.addRule({
    type: 'method',
    name: name,
    userId: userId,
    connectionId: connectionId,
    clientAddress: clientAddress
  }, numRequests, timeInterval, callback);
  return methodOptions;
};