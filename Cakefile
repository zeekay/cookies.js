require 'shortcake'

use 'cake-bundle'
use 'cake-outdated'
use 'cake-publish'
use 'cake-test'
use 'cake-version'

task 'clean', 'clean project', ->
  exec 'rm -rf lib'

task 'build', 'build project', ->
  bundle.write
    entry:   'src/index.coffee'
    formats: ['cjs', 'es']
    compilers:
      coffee: version: 1

task 'build:min', 'build minified version', ['build'], ->
  b = yield bundle
    entry:      'src/index.coffee'
    format:     'web'
    external:   false
    moduleName: 'Cookies'
    compilers:
      coffee: version: 1

  Promise.all [
    b.write
      dest:      'cookies.js'
      sourceMap: 'inline'
    b.write
      dest:      'cookies.min.js'
      minifiy:   true
      sourceMap: false
  ]

task 'watch', 'watch project', ->
  watch 'src/*.coffee', (filename) ->
    console.log filename, 'modified, rebuilding'
    invoke 'build' if not running 'build'

task 'test', 'run tests', ->
  exec 'qunit'
