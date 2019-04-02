/**
 * Dependencies
 */

const jsonwebtoken = require('jsonwebtoken')
const read = require('cookie').parse

/**
 * Parse HTTP request and check for JWT token in authorization bearer as well
 * as cookie.
 *
 * @param {Stream} req
 * @param {Function} cb
 * @param {Object} options
 * @api public
 */

module.exports = (req, cb, options = {}) => {
  const {
    key = 'access_token',
    secret = process.env.JWT_SECRET
  } = options
  jsonwebtoken.verify(parse(req.headers, key), secret, (err, decoded) => {
    if (err) cb(forbidden())
    else cb(null, decoded)
  })
}

/**
 * Parse request headers and return token.
 *
 * @param {Object} headers
 * @param {String} key
 * @return {String}
 * @api private
 */

function parse (headers, key) {
  let token = ''
  if (headers) {
    const {Authorization, cookie} = headers
    if (cookie) token = read(cookie)[key]
    if (Authorization) {
      const [type, bearer] = Authorization.split(' ')
      if (type === 'Bearer') {
        token = bearer
      }
    }
  }
  return token
}

/**
 * Create forbidden error.
 * Error has status code in order to be directly used
 * by libraries such as manner.
 *
 * @return {Error}
 * @api private
 */

function forbidden () {
  const error = new Error('forbidden')
  error.status = 403
  return error
}
