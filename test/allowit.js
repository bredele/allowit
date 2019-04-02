/**
 * Dependencies
 */

const test = require('tape')
const allow = require('..')

test('should error if no authorization bearer token', assert => {
  assert.plan(1)
  allow(req(), (err => {
    if (err) assert.ok('error')
  }))
})


function req () {
  
}
