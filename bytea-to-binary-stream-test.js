var tape = require('tape')
var _test = require('tape-promise').default
var test = _test(tape)

const { assertConvertsTo } = require('./test-support')
const { byteaToBinaryStream } = require('./')

test('bytea to binary stream gives correct result when input cuts at chunk boundary multiple ways', async (t) => {
  const input = [...Buffer.from('\\\\x616263').values()]

  for (let i = 1; i < input.length; i++) {
    const inputPart1 = input.slice(0, i)
    const inputPart2 = input.slice(i)

    await assertConvertsTo(t, [inputPart1, inputPart2], byteaToBinaryStream(), 'abc')
  }
  t.end()
})

test('bytea to binary stream fails if not prefixed with \\\\x', (t) => {
  t.throws(() => {
    const dest = byteaToBinaryStream()
    dest.write(Buffer.from('616263'))
  }, /prefix/)
  t.end()
})
