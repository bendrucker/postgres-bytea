'use strict'

const test = require('tape-promise').default(require('tape'))

const { assertConvertsTo } = require('./test-support')
const Encoder = require('./encoder')

test('binary to bytea stream empty input gives empty result', async (t) => {
  await assertConvertsTo(t, [], new Encoder(), '\\\\x')
  t.end()
})

test('binary to bytea stream gives correct result when input cuts at chunk boundary multiple ways', async (t) => {
  const input = [0x12, 0x34, 0x56]

  for (let i = 1; i < input.length; i++) {
    const inputPart1 = input.slice(0, i)
    const inputPart2 = input.slice(i)

    await assertConvertsTo(t, [inputPart1, inputPart2], new Encoder(), '\\\\x123456')
  }
  t.end()
})
