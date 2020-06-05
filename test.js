'use strict'

var assert = require('assert')

var bytea = require('./')

describe('bytea to binary', () => {
  it('handles pg <9 escape syntax', () => {
    var buffer = Buffer.from([102, 111, 111, 0, 128, 92, 255])
    assert(buffer.equals(bytea('foo\\000\\200\\\\\\377')))
  })
})
