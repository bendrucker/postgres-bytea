'use strict'

const test = require('tape-promise').default(require('tape'))

const { assertConvertsTo } = require('./test-support')
const Decoder = require('./decoder')

test('bytea to binary stream gives correct result when input cuts at chunk boundary multiple ways', async (t) => {
  const input = [...Buffer.from('\\\\x616263').values()]

  for (let i = 1; i < input.length; i++) {
    const inputPart1 = input.slice(0, i)
    const inputPart2 = input.slice(i)

    await assertConvertsTo(t, [inputPart1, inputPart2], new Decoder(), 'abc')
  }
  t.end()
})

test('bytea to binary stream fails if not prefixed with \\\\x', (t) => {
  t.throws(() => {
    const dest = new Decoder()
    dest.write(Buffer.from('616263'))
  }, /prefix/)
  t.end()
})
