###!
# JavaScript Cookie v2.1.3
# https://github.com/js-cookie/js-cookie
#
# Copyright 2006, 2015 Klaus Hartl & Fagner Brack
# Released under the MIT license
###
import objectAssign from 'es-object-assign'

init = (converter) ->
  api = (key, value, attributes) ->
    return if typeof document == 'undefined'

    # Write
    if arguments.length > 1
      attributes = Object.assign {path: '/'}, api.defaults, attributes

      if typeof attributes.expires == 'number'
        expires = new Date
        expires.setMilliseconds expires.getMilliseconds() + attributes.expires * 864e+5
        attributes.expires = expires

      # We're using "expires" because "max-age" is not supported by IE
      attributes.expires = if attributes.expires then attributes.expires.toUTCString() else ''

      try
        result = JSON.stringify(value)
        if /^[\{\[]/.test(result)
          value = result
      catch err

      unless converter.write
        value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
      else
        value = converter.write(value, key)

      key = encodeURIComponent(String(key))
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      key = key.replace(/[\(\)]/g, escape)

      stringifiedAttributes = ''

      for attributeName of attributes
        unless attributes[attributeName]
          continue

        stringifiedAttributes += '; ' + attributeName

        if attributes[attributeName] == true
          continue

        stringifiedAttributes += '=' + attributes[attributeName]

      return document.cookie = key + '=' + value + stringifiedAttributes

    # Read
    unless key
      result = {}

    # To prevent the for loop in the first place assign an empty array
    # in case there are no cookies at all. Also prevents odd result when
    # calling "get()"
    cookies = if document.cookie then document.cookie.split('; ') else []
    rdecode = /(%[0-9A-Z]{2})+/g

    i = 0
    while i < cookies.length
      parts  = cookies[i].split '='
      cookie = parts.slice(1).join '='

      if cookie.charAt(0) == '"'
        cookie = cookie.slice 1, -1

      try
        name = parts[0].replace(rdecode, decodeURIComponent)
        cookie = if converter.read then converter.read cookie, name else converter(cookie, name) or cookie.replace rdecode, decodeURIComponent

        if @json
          try
            cookie = JSON.parse cookie
          catch err

        if key == name
          result = cookie
          break

        unless key
          result[name] = cookie
      catch err

    result

  api.set = api

  api.get = (key) ->
    api.call api, key

  api.getJSON = ->
    api.apply json: true, [].slice.call arguments

  api.defaults = {}

  api.remove = (key, attributes) ->
    api key, '', Object.assign attributes, expires: -1
    return

  api.withConverter = init
  api

export default init ->
