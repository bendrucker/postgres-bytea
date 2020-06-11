'use strict'

const test = require('tape')

const { byteaToBinary } = require('./')

test('bytea to binary handles pg <9 escape format', (t) => {
  const buffer = Buffer.from([102, 111, 111, 0, 128, 92, 255])
  t.ok(buffer.equals(byteaToBinary('foo\\000\\200\\\\\\377')))
  t.end()
})

test('bytea to binary handles pg >=9 hex format', (t) => {
  t.ok(byteaToBinary('\\x1234').equals(Buffer.from([0x12, 0x34])))
  t.end()
})
