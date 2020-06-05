var tape = require('tape')
var _test = require('tape-promise').default
var test = _test(tape)

const { assertConvertsTo } = require('./streamTestSupport')
const { binaryToByteaStream } = require('..')

test('binary to bytea stream empty input gives empty result', async (t) => {
  await assertConvertsTo(t, [], binaryToByteaStream(), '\\\\x')
  t.end()
})

test('binary to bytea stream gives correct result when input cuts at chunk boundary multiple ways', async (t) => {
  const input = [0x12, 0x34, 0x56]

  for (let i = 1; i < input.length; i++) {
    const inputPart1 = input.slice(0, i)
    const inputPart2 = input.slice(i)

    await assertConvertsTo(t, [inputPart1, inputPart2], binaryToByteaStream(), '\\\\x123456')
  }
  t.end()
})
