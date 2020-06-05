'use strict'

const binaryToByteaStream = require('./binaryToByteaStream')
const byteaToBinary = require('./byteaToBinary')
const byteaToBinaryStream = require('./byteaToBinaryStream')

module.exports = byteaToBinary // default export for backwards compatibility
module.exports.binaryToByteaStream = binaryToByteaStream
module.exports.byteaToBinary = byteaToBinary
module.exports.byteaToBinaryStream = byteaToBinaryStream
