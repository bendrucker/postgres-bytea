'use strict'

var test = require('tape')
var bytea = require('./')

test(function (t) {
  var buffer = new Buffer([102, 111, 111, 0, 128, 92, 255])
  t.ok(buffer.equals(bytea('foo\\000\\200\\\\\\377')))
  t.end()
})
