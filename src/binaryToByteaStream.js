const { Transform } = require('stream')

class BinaryToByteaStreamTransform extends Transform {
  constructor () {
    super()
    this.push('\\\\x')
  }

  _transform (chunk, encoding, callback) {
    this.push(chunk.toString('hex'))
    callback()
  }
}

function binaryToByteaStream () {
  return new BinaryToByteaStreamTransform()
}

module.exports = binaryToByteaStream
