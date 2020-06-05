const assert = require('assert')
const concat = require('concat-stream')

const { binaryToByteaStream } = require('..')

function assertConvertsTo (input, transform, expected, done) {
  transform.pipe(
    concat((actual) => {
      assert.strictEqual(actual.toString(), expected)
      done()
    })
  )
  // write one item at a time, to bring out possible chunk boundary errors
  for (const item of input) {
    transform.write(Buffer.from([item]))
  }
  transform.end()
}

module.exports = {
  assertConvertsTo
}

describe('binary to bytea', () => {
  it('works', (done) => {
    assertConvertsTo([0x12, 0x34, 0x56], binaryToByteaStream(), '\\\\x123456', done)
  })
})
