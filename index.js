/**
 * Dependencies
 */

const jsonwebtoken = require('jsonwebtoken')

/**
 * Parse HTTP request and check for JWT token in authorization bearer as well
 * as cookie.
 *
 * @param {Stream} req
 * @param {Function} cb
 * @api public
 */

module.exports = (req, cb) => {
  const payload = getPayload(req)
  cb(forbidden(), payload)
}

/**
 *
 */

function getPayload (req, secret = process.env.JWT_SECRET) {
  const headers = req.headers
  if (headers) {
    const {Authorization, cookie} = headers
    if (Authorization) {
      const [type, token] = Authorization.split(' ')
      if (type === 'Bearer') return jsonwebtoken.verify(token, secret)
    }
  }
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
