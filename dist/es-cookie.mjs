var getOwnPropertySymbols;
var hasOwnProperty;
var objectAssign;
var propIsEnumerable;
var shouldUseNative;
var toObject;
var slice = [].slice;

getOwnPropertySymbols = Object.getOwnPropertySymbols;

hasOwnProperty = Object.prototype.hasOwnProperty;

propIsEnumerable = Object.prototype.propertyIsEnumerable;

toObject = function(val) {
  if (val === null || val === void 0) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
};

shouldUseNative = function() {
  var err, i, j, k, len, letter, order2, ref, test1, test2, test3;
  try {
    if (!Object.assign) {
      return false;
    }
    test1 = new String('abc');
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }
    test2 = {};
    for (i = j = 0; j <= 9; i = ++j) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }
    test3 = {};
    ref = 'abcdefghijklmnopqrst'.split('');
    for (k = 0, len = ref.length; k < len; k++) {
      letter = ref[k];
      test3[letter] = letter;
    }
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (error) {
    err = error;
    return false;
  }
};

var index$1 = objectAssign = (function() {
  if (shouldUseNative()) {
    return Object.assign;
  }
  return function() {
    var from, j, k, key, len, len1, ref, source, sources, symbol, target, to;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    to = toObject(target);
    for (j = 0, len = sources.length; j < len; j++) {
      source = sources[j];
      from = Object(source);
      for (key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        ref = getOwnPropertySymbols(from);
        for (k = 0, len1 = ref.length; k < len1; k++) {
          symbol = ref[k];
          if (propIsEnumerable.call(from, symbol)) {
            to[symbol] = from[symbol];
          }
        }
      }
    }
    return to;
  };
})();

module.exports = index$1;

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
var init;

init = function(converter) {
  var api;
  api = function(key, value, attributes) {
    var attributeName, cookie, cookies, err, expires, i, name, parts, rdecode, result, stringifiedAttributes;
    if (typeof document === 'undefined') {
      return;
    }
    if (arguments.length > 1) {
      attributes = Object.assign({
        path: '/'
      }, api.defaults, attributes);
      if (typeof attributes.expires === 'number') {
        expires = new Date;
        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
        attributes.expires = expires;
      }
      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
      try {
        result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (error) {
        err = error;
      }
      if (!converter.write) {
        value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      } else {
        value = converter.write(value, key);
      }
      key = encodeURIComponent(String(key));
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
      key = key.replace(/[\(\)]/g, escape);
      stringifiedAttributes = '';
      for (attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += '=' + attributes[attributeName];
      }
      return document.cookie = key + '=' + value + stringifiedAttributes;
    }
    if (!key) {
      result = {};
    }
    cookies = document.cookie ? document.cookie.split('; ') : [];
    rdecode = /(%[0-9A-Z]{2})+/g;
    i = 0;
    while (i < cookies.length) {
      parts = cookies[i].split('=');
      cookie = parts.slice(1).join('=');
      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }
      try {
        name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
        if (this.json) {
          try {
            cookie = JSON.parse(cookie);
          } catch (error) {
            err = error;
          }
        }
        if (key === name) {
          result = cookie;
          break;
        }
        if (!key) {
          result[name] = cookie;
        }
      } catch (error) {
        err = error;
      }
    }
    return result;
  };
  api.set = api;
  api.get = function(key) {
    return api.call(api, key);
  };
  api.getJSON = function() {
    return api.apply({
      json: true
    }, [].slice.call(arguments));
  };
  api.defaults = {};
  api.remove = function(key, attributes) {
    api(key, '', Object.assign(attributes, {
      expires: -1
    }));
  };
  api.withConverter = init;
  return api;
};

var index = init(function() {});

export default index;
