const { assertConvertsTo } = require('./streamTestSupport')
const { binaryToByteaStream } = require('..')

describe('binary to bytea', () => {
  it('empty input gives empty result', async () => {
    await assertConvertsTo([], binaryToByteaStream(), '\\\\x')
  })

  it('gives correct result when input cuts at chunk boundary multiple ways', async () => {
    const input = [0x12, 0x34, 0x56]

    for (let i = 1; i < input.length; i++) {
      const inputPart1 = input.slice(0, i)
      const inputPart2 = input.slice(i)

      await assertConvertsTo([inputPart1, inputPart2], binaryToByteaStream(), '\\\\x123456')
    }
  })
})
