# postgres-bytea [![Build Status](https://travis-ci.org/bendrucker/postgres-bytea.svg?branch=master)](https://travis-ci.org/bendrucker/postgres-bytea) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/postgres-bytea.svg)](https://greenkeeper.io/)

> Conversion between Postgres bytea format and binary.


## Install

```
$ npm install postgres-bytea
```


## Usage

### Convert bytea string to buffer

The function `byteaToBinary()` converts a string in bytea format to a buffer.

```js
const { byteaToBinary } = require('postgres-bytea')

// bytea hex format
byteaToBinary('\\x1234') // <Buffer 12 34>
```

or

```js
// bytea escape format
byteaToBinary('\\000\\100\\200') // <Buffer 00 40 80>
```

Supports both pg >= 9.0 bytea hex format and pg < 9 bytea escape format. The library automatically detects the format from the incoming data.

This function expects single-escaped prefix `\x`.

For backward compatibility, this function is also assigned to module.exports. The default export can then be used `const byteaToBinary = require("postgres-bytea")`

### Transform bytea hex stream to binary

The function `byteaToBinaryStream()` transforms a bytea hex stream into a binary stream.

```js
const { byteaToBinaryStream } = require('postgres-bytea')

const byteaStream; // acquire bytea stream from somewhere
const binaryStream = byteaStream.pipe(byteaToBinaryStream())
// read binary data from binaryStream
```

Expects double-escaped prefix `\\x` to allow reading from a COPY TO statement.

### Transform binary stream to bytea hex format

The function `binaryToByteaStream()` transforms a binary stream into a bytea hex format stream.

```js
const { binaryToByteaStream } = require('postgres-bytea')

const binaryStream; // acquire binary stream from somewhere
const byteaStream = binaryStream.pipe(binaryToByteaStream())
// read bytea data from byteaStream
```

Produces double-escaped prefix `\\x` to allow writing to a COPY FROM statement.

## API

#### `byteaToBinary(input)` -> `buffer`

##### input

*Required*  
Type: `string`

A Postgres bytea binary string.

#### `byteaToBinaryStream()` -> `Transform`-stream

#### `binaryToByteaStream()` -> `Transform`-stream

## Single `\x` vs. double-escaped `\\x` bytea prefix

> The “hex” format encodes binary data as 2 hexadecimal digits per byte, most significant nibble first. The entire string is preceded by the sequence \x (to distinguish it from the escape format). In some contexts, the initial backslash may need to be escaped by doubling it (see Section 4.1.2.1).
>
> https://www.postgresql.org/docs/12/datatype-binary.html#id-1.5.7.12.9

A SELECT statement returns bytea values using the single-escaped `\x` prefix. The data moving commands COPY TO and COPY FROM expect and return bytea values with the double-escaped `\\x` prefix. 

Therefore, the string version of converting bytea to binary expects single-escaped prefix. The stream version of both bytea to binary and binary to bytea use doubly-escaped prefix, since they are most usable in COPY FROM and COPY TO statements.

## License

MIT © [Ben Drucker](http://bendrucker.me)
