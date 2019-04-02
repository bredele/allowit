/**
 * Dependencies
 */

const jsonwebtoken = require('jsonwebtoken')
const parse = require('cookie').parse

/**
 * Parse HTTP request and check for JWT token in authorization bearer as well
 * as cookie.
 *
 * @param {Stream} req
 * @param {Function} cb
 * @param {Object} options
 * @api public
 */

module.exports = (req, cb, options) => {
  const headers = req.headers
  let token = ''
  if (headers) {
    const {Authorization, cookie} = headers
    if (cookie) {
      token = parse(cookie)['access_token']
    }
    if (Authorization) {
      const [type, bearer] = Authorization.split(' ')
      if (type === 'Bearer') {
        token = bearer
      }
    }
  }
  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) cb(forbidden())
      else cb(null, decoded)
    })
  } else cb(forbidden())
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
