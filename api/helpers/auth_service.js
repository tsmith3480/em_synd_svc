'use strict'

const
  mongodb = require('mongodb').MongoClient,
  dbconf = require('../../config/security').db

module.exports = {
  auth: authenticate,
}

function authenticate(username, password, cb) {
  mongodb.connect(dbconf.url, dbconf.options)
    .then(db => {
      db.db(dbconf.em_synd).collection('users')
        .findOne({ email1: username })
        .then(response => {
          (response && response.password === password) ? cb(null, response) : cb({ message: 'Invalid username or password' })
          db.close(true)
        })
        .catch(err => {
          cb(err)
          db.close(true)
        })
    })
    .catch(err => {
      cb(err)
      db.close(true)
    })
}