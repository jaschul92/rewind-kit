var assert = require('assert')
var nock = require('nock')

var RewindKit = require('../index.js')

const API_URL = 'https://api.rewindkit.com/v1/'

var key = 'testKey'
var secret = 'testSecret'
var userId = 'testUserId'

var client = new RewindKit(key, secret, userId, API_URL)

test('get Ops', function (done) {
  var expectedResponse = [
    {
      'document_id': '45b6f5c6-6482-463b-8dd5-425f7aa9e7ea',
      'sequence': 1,
      'version': 71,
      'operations': {
        'ops': [
          {'retain': 33},
          {'insert': ' '}
        ]
      },
      'ts': 1491241201034,
      'document_type': 'rich-text'
    },
    {
      'document_id': '45b6f5c6-6482-463b-8dd5-425f7aa9e7ea',
      'sequence': 2,
      'version': 72,
      'operations': {
        'ops': [
          {'retain': 34},
          {'insert': 'w'}
        ]
      },
      'ts': 1491241201180,
      'document_type': 'rich-text'
    }
  ]

  nock(API_URL)
    .get('/documents/testUserId/testDocId')
    .reply(200, expectedResponse)

  client.getOps('testDocId', function (error, response, body) {
    assert.ifError(error)
    done()
  })
})

test('post Op', function (done) {
  var ops = [
    {'retain': 33},
    {'insert': ' '}
  ]

  var expectedReq = {
    userId: 'testUserId',
    docId: 'testDocId',
    sequence: 0,
    version: 1,
    ops: ops,
    ts: 1491241201180,
    docType: 'rich-text'
  }

  nock(API_URL)
    .post('/documents/', function (body) {
      assert.deepEqual(expectedReq, body)
      return true
    })
    .reply(200, {})

  client.postOp('testDocId', 0, 1, ops, 1491241201180, 'rich-text', function (error, response, body) {
    if (error) return done(error)
    else done()
  })
})
