'use strict'
var crypto = require('crypto')

function postSign (secret, userId, docId, ts, version, docType) {
  return crypto.createHmac('sha256', secret).update(
    userId +
    docId +
    ts +
    version +
    docType).digest('hex')
}

function getSign (secret, userId, docId) {
  return crypto.createHmac('sha256', secret).update(
    userId +
    docId).digest('hex')
}

module.exports = exports = {
  post: postSign,
  get: getSign
}
