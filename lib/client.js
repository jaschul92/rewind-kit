var signer = require('./requestSigner')
var request = require('request')

var Client = function (key, secret, userId, apiURI) {
  var self = this
  self.key = key
  self.secret = secret
  self.userId = userId

  // Util methods
  self.request = makeRequest
  self.signature = makeSignature

  // API methods
  self.getOps = getOps
  self.postOp = postOp
}

function makeRequest (method, relativeURI, opts, callback) {

}

function makeSignature (method, opts) {

}

function getOps () {

}

function postOp () {

}

module.exports = exports = Client
