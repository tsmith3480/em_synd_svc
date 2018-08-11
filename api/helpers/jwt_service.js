'use strict'

const
  jwt = require('jsonwebtoken'),
  key = require('../../config/security').jwt.key;

module.exports = {
  sign: sign,
}

function sign(obj, cb) {
  const opt = { algorithm: 'RS256', expiresIn: '1hr' }

  jwt.sign(obj, key, opt, (err, token) => {
    err ? cb(err) : cb(null, token)
  })
}