use 'sake-bundle'
use 'sake-outdated'
use 'sake-publish'
use 'sake-version'

task 'clean', 'clean project', ->
  exec 'rm -rf lib'

task 'build', 'build project', ->
  bundle.write
    entry:   'src/index.coffee'
    formats: ['cjs', 'es']
    compilers:
      coffee: version: 1

task 'build:min', 'build minified version', ['build'], ->
  yield bundle.write
    entry:      'src/index.coffee'
    dest:       'cookies.js'
    sourceMap:  'inline'
    format:     'web'
    moduleName: 'Cookies'
    compilers:
      coffee: version: 1

  yield exec 'uglifyjs cookies.js -o cookies.min.js'

task 'watch', 'watch project', ->
  watch 'src/*.coffee', (filename) ->
    console.log filename, 'modified, rebuilding'
    invoke 'build' if not running 'build'

task 'test', 'run tests', ->
  exec 'qunit'
