import objectAssign from 'es-object-assign';

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
      attributes = objectAssign({
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
    api(key, '', objectAssign(attributes, {
      expires: -1
    }));
  };
  api.withConverter = init;
  return api;
};

var index = init(function() {});

export default index;
