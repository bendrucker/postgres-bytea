'use strict'

const binaryToByteaStream = require('./binaryToByteaStream')
const byteaToBinary = require('./byteaToBinary')

module.exports = byteaToBinary // default export for backwards compatibility
module.exports.binaryToByteaStream = binaryToByteaStream
module.exports.byteaToBinary = byteaToBinary
