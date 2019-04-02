/**
 * Dependencies
 */

const test = require('tape')
const allow = require('..')
const jsonwebtoken = require('jsonwebtoken')

test('should error if no authorization bearer token or cookie token', assert => {
  assert.plan(1)
  allow(req(), (err => {
    if (err) assert.ok('error')
  }))
})

test('should get payload if authorization bearer', assert => {
  assert.plan(1)
  const payload = {hello: 'world'}
  allow(req({
    'Authorization': `Bearer ${token(payload)}`
  }), (err, payload) => {
    assert.equal(payload.hello, 'world')
  })
})

test('should error if authorization bearer signed with different secret', assert => {
  assert.plan(1)
  const payload = {hello: 'world'}
  allow(req({
    'Authorization': `Bearer ${token(payload, 'coucou')}`
  }), (err, payload) => {
    if (err) assert.ok('error')
  })
})

test('should error if authorization bearer can not be verified', assert => {
  assert.plan(1)
  allow(req({
    'Authorization': `Bearer `
  }), (err, payload) => {
    if (err) assert.ok('error')
  })
})

/**
 * Create JWT token.
 *
 * @param {Object} payload
 * @param {String?} secret
 * @return {String}
 * @api private
 */

function token (payload, secret = process.env.JWT_SECRET) {
  return jsonwebtoken.sign(payload, secret)
}

/**
 * Mock HTTP request.
 *
 * @param {Object} header
 * @return {Object}
 * @api private
 */

function req (headers = {}) {
  return {
    headers: {
      ...headers
    }
  }
}
