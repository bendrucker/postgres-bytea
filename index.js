'use strict'

const byteaToBinary = module.exports = require('./bytea-to-binary')

byteaToBinary.byteaToBinary = byteaToBinary
byteaToBinary.binaryToByteaStream = require('./binary-to-bytea-stream')
byteaToBinary.byteaToBinaryStream = require('./bytea-to-binary-stream')
