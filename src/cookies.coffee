import objectAssign from 'es-object-assign'
import {isNumber}   from 'es-is'


class Cookies
  contructor: (@defaults = {}) ->

  api: (key, value, attrs) ->
    return if typeof document == 'undefined'

    # Write
    if arguments.length > 1
      attrs = objectAssign path: '/', @defaults, attrs

      if isNumber attrs.expires
        expires = new Date
        expires.setMilliseconds expires.getMilliseconds() + attrs.expires * 864e+5
        attrs.expires = expires

      # We're using "expires" because "max-age" is not supported by IE
      attrs.expires = if attrs.expires then attrs.expires.toUTCString() else ''

      try
        result = JSON.stringify(value)
        if /^[\{\[]/.test(result)
          value = result
      catch err

      value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)

      key = encodeURIComponent String key
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      key = key.replace(/[\(\)]/g, escape)

      strAttrs = ''

      for name, attr of attrs
        continue unless attr
        strAttrs += '; ' + name
        continue if attr == true
        strAttrs += '=' + attr

      return document.cookie = key + '=' + value + strAttrs

    # Read
    unless key
      result = {}

    # To prevent the for loop in the first place assign an empty array in case
    # there are no cookies at all. Also prevents odd result when calling
    # "get()"
    cookies = if document.cookie then document.cookie.split('; ') else []
    rdecode = /(%[0-9A-Z]{2})+/g

    i = 0
    while i < cookies.length
      parts  = cookies[i].split '='
      cookie = parts.slice(1).join '='

      if cookie.charAt(0) == '"'
        cookie = cookie.slice 1, -1

      try
        name = parts[0].replace rdecode, decodeURIComponent
        cookie = cookie.replace rdecode, decodeURIComponent

        if key == name
          result = cookie
          break

        unless key
          result[name] = cookie
      catch err

    result

  get: (key) -> @api key

  getJSON: (key) ->
    try
      JSON.parse @api key
    catch err
      {}

  set: (key, value, attrs) ->
    @api key, value, attrs

  remove: (key, attrs) ->
    @api key, '', objectAssign attrs, expires: -1

export default Cookies
