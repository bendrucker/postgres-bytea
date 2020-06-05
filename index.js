'use strict'

const binaryToByteaStream = require('./src/binaryToByteaStream')
const byteaToBinary = require('./src/byteaToBinary')
const byteaToBinaryStream = require('./src/byteaToBinaryStream')

module.exports = byteaToBinary // default export for backwards compatibility
module.exports.binaryToByteaStream = binaryToByteaStream
module.exports.byteaToBinary = byteaToBinary
module.exports.byteaToBinaryStream = byteaToBinaryStream
