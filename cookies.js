var Cookies = (function (isNumber,objectAssign) {
'use strict';

isNumber = 'default' in isNumber ? isNumber['default'] : isNumber;
objectAssign = 'default' in objectAssign ? objectAssign['default'] : objectAssign;

// src/cookies.coffee
var Cookies;

Cookies = (function() {
  function Cookies(defaults) {
    this.defaults = defaults != null ? defaults : {};
    this.get = (function(_this) {
      return function(key) {
        return _this.read(key);
      };
    })(this);
    this.getJSON = (function(_this) {
      return function(key) {
        var err;
        try {
          return JSON.parse(_this.read(key));
        } catch (error) {
          err = error;
          return {};
        }
      };
    })(this);
    this.remove = (function(_this) {
      return function(key, attrs) {
        return _this.write(key, '', objectAssign({
          expires: -1
        }, attrs));
      };
    })(this);
    this.set = (function(_this) {
      return function(key, value, attrs) {
        return _this.write(key, value, attrs);
      };
    })(this);
  }

  Cookies.prototype.read = function(key) {
    var cookie, cookies, err, i, kv, len, name, parts, rdecode, result;
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

  Cookies.prototype.write = function(key, value, attrs) {
    var attr, err, expires, name, result, strAttrs;
    attrs = objectAssign({
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
  };

  return Cookies;

})();

var Cookies$1 = Cookies;

// src/index.coffee
var index = new Cookies$1();

return index;

}(isNumber,objectAssign));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llcy5qcyIsInNvdXJjZXMiOlsic3JjL2Nvb2tpZXMuY29mZmVlIiwic3JjL2luZGV4LmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNOdW1iZXIgICAgIGZyb20gJ2VzLWlzL251bWJlcidcbmltcG9ydCBvYmplY3RBc3NpZ24gZnJvbSAnZXMtb2JqZWN0LWFzc2lnbidcblxuXG5jbGFzcyBDb29raWVzXG4gIGNvbnN0cnVjdG9yOiAoQGRlZmF1bHRzID0ge30pIC0+XG4gICAgQGdldCAgICAgPSAoa2V5KSA9PiBAcmVhZCBrZXlcbiAgICBAZ2V0SlNPTiA9IChrZXkpID0+XG4gICAgICB0cnlcbiAgICAgICAgSlNPTi5wYXJzZSBAcmVhZCBrZXlcbiAgICAgIGNhdGNoIGVyclxuICAgICAgICB7fVxuXG4gICAgQHJlbW92ZSA9IChrZXksIGF0dHJzKSAgICAgICAgPT4gQHdyaXRlIGtleSwgJycsIG9iamVjdEFzc2lnbiBleHBpcmVzOiAtMSwgYXR0cnNcbiAgICBAc2V0ICAgID0gKGtleSwgdmFsdWUsIGF0dHJzKSA9PiBAd3JpdGUga2V5LCB2YWx1ZSwgYXR0cnNcblxuICByZWFkOiAoa2V5KSAtPlxuICAgIHVubGVzcyBrZXlcbiAgICAgIHJlc3VsdCA9IHt9XG5cbiAgICAjIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXkgaW4gY2FzZVxuICAgICMgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlbiBjYWxsaW5nXG4gICAgIyBcImdldCgpXCJcbiAgICBjb29raWVzID0gaWYgZG9jdW1lbnQuY29va2llIHRoZW4gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIGVsc2UgW11cbiAgICByZGVjb2RlID0gLyglWzAtOUEtWl17Mn0pKy9nXG5cbiAgICBmb3Iga3YgaW4gY29va2llc1xuICAgICAgcGFydHMgID0ga3Yuc3BsaXQgJz0nXG4gICAgICBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luICc9J1xuXG4gICAgICBpZiBjb29raWUuY2hhckF0KDApID09ICdcIidcbiAgICAgICAgY29va2llID0gY29va2llLnNsaWNlIDEsIC0xXG5cbiAgICAgIHRyeVxuICAgICAgICBuYW1lICAgPSBwYXJ0c1swXS5yZXBsYWNlIHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudFxuICAgICAgICBjb29raWUgPSBjb29raWUucmVwbGFjZSAgIHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudFxuXG4gICAgICAgIGlmIGtleSA9PSBuYW1lXG4gICAgICAgICAgcmV0dXJuIGNvb2tpZVxuICAgICAgICB1bmxlc3Mga2V5XG4gICAgICAgICAgcmVzdWx0W25hbWVdID0gY29va2llXG5cbiAgICAgIGNhdGNoIGVyclxuXG4gICAgcmVzdWx0XG5cbiAgd3JpdGU6IChrZXksIHZhbHVlLCBhdHRycykgLT5cbiAgICBhdHRycyA9IG9iamVjdEFzc2lnbiBwYXRoOiAnLycsIEBkZWZhdWx0cywgYXR0cnNcblxuICAgIGlmIGlzTnVtYmVyIGF0dHJzLmV4cGlyZXNcbiAgICAgIGV4cGlyZXMgPSBuZXcgRGF0ZVxuICAgICAgZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMgZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGF0dHJzLmV4cGlyZXMgKiA4NjRlKzVcbiAgICAgIGF0dHJzLmV4cGlyZXMgPSBleHBpcmVzXG5cbiAgICAjIFdlJ3JlIHVzaW5nIFwiZXhwaXJlc1wiIGJlY2F1c2UgXCJtYXgtYWdlXCIgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuICAgIGF0dHJzLmV4cGlyZXMgPSBpZiBhdHRycy5leHBpcmVzIHRoZW4gYXR0cnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIGVsc2UgJydcblxuICAgIHRyeVxuICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICBpZiAvXltcXHtcXFtdLy50ZXN0KHJlc3VsdClcbiAgICAgICAgdmFsdWUgPSByZXN1bHRcbiAgICBjYXRjaCBlcnJcblxuICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcbiAgICBrZXkgICA9IGVuY29kZVVSSUNvbXBvbmVudCBTdHJpbmcga2V5XG4gICAga2V5ICAgPSBrZXkucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgIGtleSAgID0ga2V5LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSlcblxuICAgIHN0ckF0dHJzID0gJydcblxuICAgIGZvciBuYW1lLCBhdHRyIG9mIGF0dHJzXG4gICAgICBjb250aW51ZSB1bmxlc3MgYXR0clxuICAgICAgc3RyQXR0cnMgKz0gJzsgJyArIG5hbWVcbiAgICAgIGNvbnRpbnVlIGlmIGF0dHIgPT0gdHJ1ZVxuICAgICAgc3RyQXR0cnMgKz0gJz0nICsgYXR0clxuXG4gICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyBzdHJBdHRyc1xuXG5cbmV4cG9ydCBkZWZhdWx0IENvb2tpZXNcbiIsImltcG9ydCBDb29raWVzIGZyb20gJy4vY29va2llcydcbmV4cG9ydCBkZWZhdWx0IG5ldyBDb29raWVzKClcbiJdLCJuYW1lcyI6WyJDb29raWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQTs7QUFBQSxBQUNBLEFBR007RUFDUyxpQkFBQyxRQUFEO0lBQUMsSUFBQyxDQUFBLDhCQUFELFdBQVk7SUFDeEIsSUFBQyxDQUFBLEdBQUQsR0FBVyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsR0FBRDtlQUFTLEtBQUMsQ0FBQSxJQUFELENBQU0sR0FBTjs7S0FBVCxFQUFBLElBQUE7SUFDWCxJQUFDLENBQUEsT0FBRCxH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
