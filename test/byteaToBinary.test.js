const assert = require('assert')

const { byteaToBinary } = require('..')

describe('bytea to binary', () => {
  it('handles pg <9 escape format', () => {
    const buffer = Buffer.from([102, 111, 111, 0, 128, 92, 255])
    assert(buffer.equals(byteaToBinary('foo\\000\\200\\\\\\377')))
  })

  it('handles pg >=9 hex format', () => {
    assert(byteaToBinary('\\x1234').equals(Buffer.from([0x12, 0x34])))
  })
})
