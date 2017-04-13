use 'sake-bundle'
use 'sake-outdated'
use 'sake-publish'
use 'sake-version'

task 'clean', 'clean project', ->
  exec 'rm -rf lib'

task 'build', 'build project', ->
  b = new Bundle
    entry: 'src/index.coffee'
    compilers:
      coffee: version: 1

  Promise.all [
    b.write format: 'es'
    b.write format: 'cjs', include: ['es-is']
    b.write
      format:     'web'
      moduleName: 'Cookies'
      sourceMap:  'inline'
      dest:       'cookies.js'
  ]

task 'build:min', 'build minified version', ['build'], ->
  exec 'uglifyjs cookies.js -o cookies.min.js'

task 'watch', 'watch project', ->
  watch 'src/*.coffee', (filename) ->
    console.log filename, 'modified, rebuilding'
    invoke 'build' if not running 'build'

task 'test', 'run tests', ->
  exec 'qunit'
