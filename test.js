'use strict'

const test = require('tape')

const bytea = require('./')

test((t) => {
  const buffer = Buffer.from([102, 111, 111, 0, 128, 92, 255])
  t.ok(buffer.equals(bytea('foo\\000\\200\\\\\\377')))
  t.end()
})
