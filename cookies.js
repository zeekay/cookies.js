var Cookies = (function () {
'use strict';

// node_modules/es-object-assign/index.mjs
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

// node_modules/es-is/dist/index.mjs
// src/index.coffee
var isActualNaN;
var isArgs;
var isFn;
var objProto;
var owns;
var symbolValueOf;
var toStr;

objProto = Object.prototype;

owns = objProto.hasOwnProperty;

toStr = objProto.toString;

symbolValueOf = void 0;

if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}

isActualNaN = function(value) {
  return value !== value;
};

var isEqual = function(value, other) {
  var key, type;
  if (value === other) {
    return true;
  }
  type = toStr.call(value);
  if (type !== toStr.call(other)) {
    return false;
  }
  if (type === '[object Object]') {
    for (key in value) {
      if (!isEqual(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!isEqual(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }
  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!isEqual(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }
  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }
  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }
  return false;
};

var isArrayLike = function(value) {
  return !!value && !isBool(value) && owns.call(value, 'length') && isFinite(value.length) && isNumber(value.length) && value.length >= 0;
};

var isArguments = isArgs = function(value) {
  var isOldArguments, isStandardArguments;
  isStandardArguments = toStr.call(value) === '[object Arguments]';
  isOldArguments = !isArray(value) && isArrayLike(value) && isObject(value) && isFn(value.callee);
  return isStandardArguments || isOldArguments;
};

var isArray = Array.isArray || function(value) {
  return toStr.call(value) === '[object Array]';
};

var isBool = function(value) {
  return toStr.call(value) === '[object Boolean]';
};

var isFunction = isFn = function(value) {
  var isAlert, str;
  isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

var isNumber = function(value) {
  return toStr.call(value) === '[object Number]';
};

var isObject = function(value) {
  return toStr.call(value) === '[object Object]';
};

// src/cookies.coffee
var Cookies;

Cookies = (function() {
  function Cookies(defaults) {
    this.defaults = defaults != null ? defaults : {};
    this.get = (function(_this) {
      return function(key) {
        return _this.api(key);
      };
    })(this);
    this.remove = (function(_this) {
      return function(key, attrs) {
        return _this.api(key, '', index$1({
          expires: -1
        }, attrs));
      };
    })(this);
    this.set = (function(_this) {
      return function(key, value, attrs) {
        return _this.api(key, value, attrs);
      };
    })(this);
    this.getJSON = (function(_this) {
      return function(key) {
        var err, val;
        val = _this.api(key);
        if (val == null) {
          return {};
        }
        try {
          return JSON.parse(val);
        } catch (error) {
          err = error;
          return val;
        }
      };
    })(this);
  }

  Cookies.prototype.api = function(key, value, attrs) {
    var attr, cookie, cookies, err, expires, i, kv, len, name, parts, rdecode, result, strAttrs;
    if (typeof document === 'undefined') {
      return;
    }
    if (arguments.length > 1) {
      attrs = index$1({
        path: '/'
      }, this.defaults, attrs);
      if (isNumber(attrs.expires)) {
        expires = new Date;
        expires.setMilliseconds(expires.getMilliseconds() + attrs.expires * 864e+5);
        attrs.expires = expires;
      }
      attrs.expires = attrs.expires ? attrs.expires.toUTCString() : '';
      try {
        result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (error) {
        err = error;
      }
      value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key));
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
      key = key.replace(/[\(\)]/g, escape);
      strAttrs = '';
      for (name in attrs) {
        attr = attrs[name];
        if (!attr) {
          continue;
        }
        strAttrs += '; ' + name;
        if (attr === true) {
          continue;
        }
        strAttrs += '=' + attr;
      }
      return document.cookie = key + '=' + value + strAttrs;
    }
    if (!key) {
      result = {};
    }
    cookies = document.cookie ? document.cookie.split('; ') : [];
    rdecode = /(%[0-9A-Z]{2})+/g;
    for (i = 0, len = cookies.length; i < len; i++) {
      kv = cookies[i];
      parts = kv.split('=');
      cookie = parts.slice(1).join('=');
      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }
      try {
        name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = cookie.replace(rdecode, decodeURIComponent);
        if (key === name) {
          return cookie;
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

  return Cookies;

})();

var Cookies$1 = Cookies;

// src/index.coffee
var index = new Cookies$1();

return index;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llcy5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==
