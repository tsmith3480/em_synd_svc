'use strict'

module.exports = {
  login: login,
}

const
  auth = require('../helpers/auth_service').auth,
  jwt = require('../helpers/jwt_service');

function login(req, res, next) {
  auth(req.body.UserName, req.body.Password, (err, user) => {
    if (err) return res.json(401, err)

    jwt.sign(user, (err, token) => {
      err ? res.json(500, err) : res.json(200, { message: 'OK', token: token })
    })
  })
}