const assert = require('assert')
const concat = require('concat-stream')

async function assertConvertsTo (inputs, transform, expected) {
  return new Promise((resolve, reject) => {
    if (typeof inputs === 'string') {
      inputs = [inputs]
    }
    function handleResult (actual) {
      assert.strictEqual(actual.toString(), expected)
      resolve()
    }
    transform.pipe(concat(handleResult))
    for (const input of inputs) {
      transform.write(Buffer.from(input))
    }
    transform.end()
  })
}

module.exports = {
  assertConvertsTo
}
