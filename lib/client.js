var signer = require('./requestSigner')
var request = require('request')

const defaultURI = 'https://api.rewindkit.com/v1/'

var Client = function (key, secret, userId, apiURI) {
  var self = this

  if (!key || !secret || !userId) {
    throw new Error('Error - Missing API key, secret or userID!')
  }

  self.key = key
  self.secret = secret
  self.userId = userId
  self.apiURI = apiURI || defaultURI

  // Util methods
  self.request = makeRequest
  self.signature = makeSignature

  // API methods
  self.getOps = getOps
  self.postOp = postOp
}

function makeRequest (method, relativeURI, body, callback) {
  var self = this

  if (!callback) {
    throw new Error('Error - Must Provide Callback!')
  }

  if (typeof callback !== 'function') {
    throw new Error('Error - Callback must be a function!')
  }

  var signature = self.signature(method, body)

  var options = {
    baseUrl: self.apiURI,
    uri: relativeURI,
    method: method,
    headers: {
      'CHOREO-API-KEY': self.key,
      'CHOREO-REQ-SIG': signature
    }
  }

  if (method === 'GET') {
    return request.get(options, callback)
  } else if (method === 'POST') {
    options.json = body
    return request.post(options, callback)
  } else {
    throw new Error('Invalid method, no call possible!')
  }
}

function makeSignature (method, body) {
  var self = this
  if (method === 'GET') {
    return signer.get(self.secret, self.userId, body.docId)
  } else if (method === 'POST') {
    return signer.post(self.secret, self.userId, body.docId, body.ts, body.version, body.docType)
  } else {
    throw new Error('Invalid method, no signature available!')
  }
}

function getOps (docId, callback) {
  var self = this
  var query = '/documents/' + self.userId + '/' + docId
  self.request('GET', query, {docId: docId}, callback)
}

function postOp (docId, sequence, version, ops, ts, docType, callback) {
  var self = this
  var query = '/documents/'
  var body = {
    userId: self.userId,
    docId: docId,
    sequence: sequence,
    version: version,
    ops: ops,
    ts: ts,
    docType: docType
  }
  self.request('POST', query, body, callback)
}

module.exports = exports = Client
