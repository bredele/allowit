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
 * @api public
 */

module.exports = (req, cb) => {
  const headers = req.headers
  if (headers) {
    const {Authorization, cookie} = headers
    if (cookie) {
      const token = parse(cookie)['access_token']
      return jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) cb(forbidden())
        else cb(null, decoded)
      })
    }
    if (Authorization) {
      const [type, token] = Authorization.split(' ')
      if (type === 'Bearer') {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) cb(forbidden())
          else cb(null, decoded)
        })
      }
    }
  }
  cb(forbidden())
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
