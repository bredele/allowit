
/**
 * Parse HTTP request and check for JWT token in authorization bearer as well
 * as cookie.
 *
 * @param {Stream} req
 * @param {Function} cb
 * @api public
 */

module.exports = (req, cb) => {
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
