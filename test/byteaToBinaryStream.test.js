const assert = require('assert')

const { assertConvertsTo } = require('./streamTestSupport')
const { byteaToBinaryStream } = require('..')

describe('bytea to binary', () => {
  it('works', async () => {
    await assertConvertsTo('\\\\x616263', byteaToBinaryStream(), 'abc')
  })

  it('fails if not prefixed with \\\\x', () => {
    try {
      const dest = byteaToBinaryStream()
      dest.write(Buffer.from('616263'))
    } catch (e) {
      // ok, expected
      assert(e.message.match(/prefix/))
      return
    }
    throw new Error('Should have failed')
  })
})
