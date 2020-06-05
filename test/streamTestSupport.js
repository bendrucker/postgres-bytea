const concat = require('concat-stream')

async function assertConvertsTo (t, inputs, transform, expected) {
  return new Promise((resolve, reject) => {
    if (typeof inputs === 'string') {
      inputs = [inputs]
    }
    function handleResult (actual) {
      t.equal(actual.toString(), expected)
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
